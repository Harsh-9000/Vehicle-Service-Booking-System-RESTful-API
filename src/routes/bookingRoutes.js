import express from "express";
import { check, param, body } from "express-validator";
import bookingControllers from "../controllers/bookingControllers.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post(
    '/',
    verifyToken,
    [
        check('vehicleType', 'Vehicle type is required').not().isEmpty(),
        check('serviceType', 'Service type is required').not().isEmpty(),
        body('bookingDate')
            .isISO8601()
            .toDate()
            .custom((value) => {
                const now = new Date();
                if (value < now) {
                    throw new Error('Booking date must be now or in the future');
                }
                return true;
            })
    ],
    bookingControllers.createBooking
);
router.get(
    '/:id',
    verifyToken,
    [param('id').notEmpty().withMessage('Booking ID is required')],
    bookingControllers.getBooking
);
router.put(
    '/:id',
    verifyToken,
    [
        param('id').notEmpty().withMessage('Booking ID is required'),
        check('vehicleType').optional().notEmpty().withMessage('Vehicle type cannot be empty if provided'),
        check('serviceType').optional().notEmpty().withMessage('Service type cannot be empty if provided'),
        check('bookingDate').optional().isISO8601().toDate().withMessage('Invalid booking date')
    ],
    bookingControllers.updateBooking
);
router.delete(
    '/:id',
    verifyToken,
    [param('id').notEmpty().withMessage('Booking ID is required')],
    bookingControllers.deleteBooking
);
router.get('/', verifyToken, bookingControllers.listBookings);

export default router;