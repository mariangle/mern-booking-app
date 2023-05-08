const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    city: String,
    address: String,
    rooms: Number,
    type: String,
    images: [String],
    description: String,
    perks: [String],
    extraInfo: String, 
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    price: Number
});


const ListingModel = mongoose.model("Listing", listingSchema);

module.exports = ListingModel;