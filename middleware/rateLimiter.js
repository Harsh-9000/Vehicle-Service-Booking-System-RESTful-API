import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests, please try again in 1 hour",
});

export default limiter