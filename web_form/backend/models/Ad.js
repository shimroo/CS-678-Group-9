import mongoose from "mongoose";
import { User } from "./user.js";

const AdSchema = new mongoose.Schema({
    prompt: { type: String, required: true },
    content: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    time: { type: Date, default: Date.now }
});

export const Ad = mongoose.model('Ad', AdSchema);