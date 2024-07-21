import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    vehicleType: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    }
})

const BookingModel = mongoose.model('Booking', BookingSchema);

export default BookingModel;