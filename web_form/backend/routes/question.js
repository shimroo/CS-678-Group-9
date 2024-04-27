import { Question } from "../models/question.js";
import { addQuestion, getQuestion } from "../controllers/question.js";
import express from 'express';

export const questionRouter = express.Router();

questionRouter.post('/add', addQuestion);
questionRouter.post('/get', getQuestion);