import express from 'express';
import { addUser, getUser, authenticateUser,changePassword, getName} from '../controllers/user.js';
import { getMyListings, getMyAuctions, createAuction } from '../controllers/auction.js';

export const userRouter = express.Router();

userRouter.post('/add', addUser);                       //Tested
userRouter.post('/login', authenticateUser);            //Tested
userRouter.post('/profile', getUser);                   //Tested
userRouter.post('/list/created', getMyAuctions);        //Tested
userRouter.post('/list/current', getMyListings);        //Tested
userRouter.post('/change', changePassword);             //Tested
userRouter.post('/create', createAuction);
userRouter.post('/name', getName);             //Tested
