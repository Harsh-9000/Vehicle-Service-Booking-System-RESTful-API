import express from "express";
import { check } from "express-validator";
import authControllers from "../controllers/authControllers.js";

const router = express.Router();

router.post('/register',
    [
        check('email', 'Email is required.').isEmail(),
        check('password', 'Password with 8 or more characters required.').isLength({
            min: 8,
        }),
    ],
    authControllers.registerUser);
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