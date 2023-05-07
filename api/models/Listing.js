const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
    owner: { type:Schema.Types.ObjectId, ref: "User" },
    title: String,
    address: String,
    images: [String],
    description: String,
    perks: [String],
    extraInfo: String, 
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
})

const ListingModel = mongoose.model("Listing", listingSchema);

module.exports = ListingModel;