import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
        console.log(`MongoDB Connected !! DB Host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection ERROR : " + error);
        process.exit(1);
    }
}