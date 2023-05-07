const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("./models/User.js");
const Listing = require("./models/Listing.js")
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "vcxnmcvneficxmkc29ea9328dm"
const download = require("image-downloader")
const multer = require("multer")
const fs = require("fs")

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname+"/uploads"))
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

mongoose.connect(process.env.MONGO_URL);

app.get("/register", (req, res) => {
    res.json("test ok");
})

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
        res.status(422).json("pass not ok");
      }
    } else {
      res.json("Not found");
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
      title, address, images, description,
      perks, extraInfo, checkIn, checkOut, maxGuests
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const listingDoc = await Listing.create({
        owner: userData.id,
        title, address, images, description,
        perks, extraInfo, checkIn, checkOut, maxGuests
      });
      res.json(listingDoc)
    });
  })

  app.get("/listings", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      const { id } = userData;
      res.json( await Listing.find({owner:id}));
    })
  })
    
  app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await Listing.findById(id))
  })

  app.put("/listings", async (req, res) => {
    const { token } = req.cookies;
    const { 
      id, title, address, images, description,
      perks, extraInfo, checkIn, checkOut, maxGuests
    } = req.body;
    console.log({ 
      id, title, address, images, description,
      perks, extraInfo, checkIn, checkOut, maxGuests
    })
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const listingDoc = await Listing.findById(id);
      if (userData.id === listingDoc.owner.toString()){
        listingDoc.set({
          title, address, images, description,
          perks, extraInfo, checkIn, checkOut, maxGuests
        })
        await listingDoc.save();
        res.json("ok")
      }
    })
  })

app.listen(4000);