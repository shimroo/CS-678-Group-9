import { submitAnswers, getAnswers } from '../controllers/answers.js';

import express from 'express';

export const answersRouter = express.Router();

answersRouter.post('/submit', submitAnswers);
answersRouter.post('/get', getAnswers);
