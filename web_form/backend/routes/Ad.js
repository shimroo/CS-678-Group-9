import express from 'express';
import { getAd, setAd } from '../controllers/Ad.js';

export const AdRouter = express.Router();

AdRouter.post('/set', setAd);
AdRouter.post('/get', getAd);


