const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
    listing: {type:Schema.Types.ObjectId, required: true, ref: "Listing"},
    user: {type:Schema.Types.ObjectId, required: true},
    checkIn: {type: Date, rqeuired: true},
    checkOut: {type: Date, rqeuired: true},
    name: {type: String, rqeuired: true},
    phone: {type: String, rqeuired: true},
    price: Number
})

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;