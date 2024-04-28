import mongoose from "mongoose";
import { User } from "./user.js";

const QuestionSchema = new mongoose.Schema({
    section: { type: String, required: true },
    statement: { type: String, required: true },
    options: [{ type: String, required: true }],
    type: { type: String, required: true }
});



export const Question = mongoose.model('Question', QuestionSchema);
