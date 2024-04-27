import mongoose from "mongoose";
import User from "./user.js";

const AnswerSchema = new mongoose.Schema({
    user_id : { type: mongoose.Schema.Types.ObjectId, ref: User },
    section: { type: String, required: true },
    answers: [{ type: String, required: true }]
});

export const Answer = mongoose.model('Answer', AnswerSchemaSchema);