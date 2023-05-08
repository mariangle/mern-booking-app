const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("./models/User.js");
const Listing = require("./models/Listing.js")
const Booking = require("./models/Booking.js")
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "vcxnmcvneficxmkc29ea9328dm"
const download = require("image-downloader")
const multer = require("multer")

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname+"/uploads"))
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.post("/register", async (req, res) => {
    const {name, email, password } = req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        }) 
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ 
        email: userDoc.email, 
        id: userDoc._id
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(userDoc);
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

  app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
      });
    } else {
      res.json(null);
    }
  });

  app.post("/logout", (req, res) => {
    res.cookie("token", "").json(true);
  })

  app.post("/upload-by-url", async (req, res) => {
    const { link } = req.body;
    if (!link) {
      res.status(400).json("The link parameter is required");
      return;
    }
    const newName = "photo" + Date.now() + ".jpg";
    try {
      await download.image({
        url: link,
        dest: __dirname + "/uploads/" + newName,
      });
      res.json(newName);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.post('/upload', upload.array('images', 100), (req, res) => {
    const uploadedFiles = req.files.map(file => file.filename);
    res.json(uploadedFiles);
  });

  app.post("/listings", (req, res) => {
    const { token } = req.cookies;
    const {
      title, city, type, rooms, address, images, description,
      perks, extraInfo, checkIn, checkOut, maxGuests, price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const listingDoc = await Listing.create({
        user: userData.id,
        title, city, type, rooms, address, images, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price
      });
      res.json(listingDoc)
    });
  })

  app.get("/user-listings", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      const { id } = userData;
      res.json( await Listing.find({user:id}));
    })
  })
    
  app.get("/listings/:id", async (req, res) => {
    res.json(await Listing.findById(req.params.id))
  });

  app.put("/listings", async (req, res) => {
    const { token } = req.cookies;
    const {
      id, title, city, type, rooms, address, images, description,
      perks, extraInfo, checkIn, checkOut, maxGuests, price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const listingDoc = await Listing.findById(id);
      if (userData.id === listingDoc.user.toString()) {
        const requiredFields = [title, city, type, rooms, address, images, description,
          perks, checkIn, checkOut, maxGuests, price];
        if (requiredFields.some(field => !field)) {
          res.status(400).json({ error: "Required fields are missing" });
        } else {
          listingDoc.set({
            user: userData.id,
            title, city, type, rooms, address, images, description,
            perks, extraInfo, checkIn, checkOut, maxGuests, price
          });
          await listingDoc.save();
          res.json("ok");
        }
      }
    });
  });
  

  app.get("/listings", async (req, res) => {
    res.json( await Listing.find());
  })

  app.post("/bookings", async (req, res) => {
    const userData = await getUserDataFromReq(req)
    const { 
      listing, checkIn, checkOut, 
      numberOfGuests, name, phone, price
    } = req.body;
    Booking.create({ 
      listing, checkIn, checkOut, 
      numberOfGuests, name, phone, price, user:userData.id
    })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred during booking creation" });
    });
  });

  app.get("/bookings", async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json( await Booking.find({user:userData.id}).populate("listing"))
  })


  
app.listen(4000);