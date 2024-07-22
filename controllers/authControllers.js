import User from "../models/User.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function registerUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        user = new User(req.body);

        await user.save();

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        )

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000,
        })

        return res.status(201).json({ token });
    } catch (error) {
        console.log('Error in /register route: ', error)
        res.status(500).send({ message: 'Something went wrong.' })
    }
}

async function loginUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000,
        });

        res.status(200).json({ token });
    } catch (error) {
        console.log('Error in /login route: ', error)
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized - User not logged in
 *     description: |
 *       This endpoint logs out the current user by clearing the auth_token cookie.
 *       It requires the user to be authenticated (bearer token should be provided).
 */
function logoutUser(req, res) {
    res.cookie('auth_token', '', {
        expires: new Date(0),
    });

    res.send();
}

export default { registerUser, loginUser, logoutUser };