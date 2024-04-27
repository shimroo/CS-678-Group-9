import mongoose from "mongoose";

export const connect = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const data = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB!");
    }
    catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
};