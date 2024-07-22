import express from "express";
import { check } from "express-validator";
import authControllers from "../controllers/authControllers.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for authentication
 */


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid input
 */
router.post('/register',
    [
        check('email', 'Email is required.').isEmail(),
        check('password', 'Password with 8 or more characters required.').isLength({
            min: 8,
        }),
    ],
    authControllers.registerUser);

/**
* @swagger
* /api/auth/login:
*   post:
*     summary: Login a user
*     tags: [Authentication]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: Login successful
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/AuthResponse'
*       401:
*         description: Invalid credentials
*/
router.post('/login',
    [
        check('email', 'Email is required.').isEmail(),
        check('password', 'Password with 8 or more characters required.').isLength({
            min: 8,
        }),
    ],
    authControllers.loginUser);
router.post('/logout', authControllers.logoutUser);

export default router;