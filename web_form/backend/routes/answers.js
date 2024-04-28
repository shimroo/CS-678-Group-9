import { submitAnswers, getAnswers, getlist} from '../controllers/answers.js';

import express from 'express';

export const answersRouter = express.Router();

answersRouter.post('/submit', submitAnswers);
answersRouter.post('/get', getAnswers);
answersRouter.post('/list', getlist);

