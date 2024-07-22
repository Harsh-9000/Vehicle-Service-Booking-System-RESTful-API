import { validationResult } from "express-validator";
import Booking from "../models/Booking.js";

async function createBooking(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        const { vehicleType, serviceType, bookingDate } = req.body;

        const newBooking = new Booking({
            userId: req.userId,
            vehicleType,
            serviceType,
            bookingDate: new Date(bookingDate),
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        console.log('Error in create booking route: ', error)
        res.status(500).send({ message: 'Something went wrong.' })
    }
}

async function getBooking(req, res) {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json(booking);
    } catch (error) {
        console.log('Error in get booking by ID route: ', error)
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

async function updateBooking(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        const updatedFields = {};

        if (req.body.vehicleType) {
            updatedFields.vehicleType = req.body.vehicleType;
        }

        if (req.body.serviceType) {
            updatedFields.serviceType = req.body.serviceType;
        }

        if (req.body.bookingDate) {
            updatedFields.bookingDate = req.body.bookingDate;
        }

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ message: "No valid update fields provided." });
        }

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' })
        }

        res.json(booking);
    } catch (error) {
        console.log('Error in update booking route: ', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

async function deleteBooking(req, res) {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        res.json({ message: "Booking deleted successfully." });
    } catch (error) {
        console.log('Error in delete booking route: ', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

async function listBookings(req, res) {
    try {
        const { date, vehicleType } = req.query;
        let query = { userId: req.userId };

        if (date) {
            query.bookingDate = new Date(date);
        }

        if (vehicleType) {
            query.vehicleType = vehicleType;
        }

        const bookings = await Booking.find(query);

        res.json(bookings);
    } catch (error) {
        console.log('Error in list bookings route: ', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export default { createBooking, getBooking, updateBooking, deleteBooking, listBookings };