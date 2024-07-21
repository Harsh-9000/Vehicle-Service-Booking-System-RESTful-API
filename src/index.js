import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "dotenv/config"
import connectDB from "./config/connectDB.js"
import authRoutes from "./routes/authRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(rateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running at http://localhost:" + PORT);
    });
})

