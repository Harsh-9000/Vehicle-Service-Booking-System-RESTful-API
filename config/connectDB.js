import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Connected to DB Successfully !!!");

        const connection = mongoose.connection;

        connection.on('error', (error) => {
            console.log("Something went wrong in connecting to DB", error);
        });
    } catch (error) {
        console.log("Something went wrong", error);
    }
}

export default connectDB;
