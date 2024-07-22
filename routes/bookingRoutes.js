import express from "express";
import { check, param, body } from "express-validator";
import bookingControllers from "../controllers/bookingControllers.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - vehicleType
 *         - serviceType
 *         - bookingDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the booking
 *         vehicleType:
 *           type: string
 *           description: The type of the vehicle
 *         serviceType:
 *           type: string
 *           description: The type of service requested
 *         bookingDate:
 *           type: string
 *           format: date-time
 *           description: The date and time of the booking
 *         userId:
 *           type: string
 *           description: The id of the user who made the booking
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid input
 */
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

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get a specific booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 */
router.get(
    '/:id',
    verifyToken,
    [param('id').notEmpty().withMessage('Booking ID is required')],
    bookingControllers.getBooking
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Booking not found
 */
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

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 */
router.delete(
    '/:id',
    verifyToken,
    [param('id').notEmpty().withMessage('Booking ID is required')],
    bookingControllers.deleteBooking
);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Retrieve a list of bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to filter bookings
 *       - in: query
 *         name: vehicleType
 *         schema:
 *           type: string
 *         description: Vehicle type to filter bookings
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
router.get('/', verifyToken, bookingControllers.listBookings);

export default router;