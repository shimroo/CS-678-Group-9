import mongoose from "mongoose";
import { User } from "./user.js";

const QuestionSchema = new mongoose.Schema({
    section: { type: String, required: true },
    statement: { type: String, required: true },
    options: [{ type: String, required: true }],
    type: { type: String, required: true }
});

const FewShotSchema = new mongoose.Schema({
    section: { type: String, required: true },
    content1: { type: String, required: true },
    content2: { type: String, required: true },
});

export const Question = mongoose.model('Question', QuestionSchema);
export const FewShot = mongoose.model('FewShot', FewShotSchema);
