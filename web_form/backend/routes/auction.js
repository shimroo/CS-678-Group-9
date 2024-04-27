import express from 'express';
import { getAuction , getOngoing, searchAuctions, placeBid} from '../controllers/auction.js';

export const auctionRouter = express.Router();

//create auction for a specific user wiith id passed in URL
auctionRouter.post('/ongoing', getOngoing);             //Tested
auctionRouter.post('/search', searchAuctions);          //Tested
auctionRouter.post('/page', getAuction);                //Tested
auctionRouter.post('/bid', placeBid);                   //Tested


