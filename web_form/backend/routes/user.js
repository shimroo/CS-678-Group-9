import express from 'express';
import { getUser, setUser, authenticateUser} from '../controllers/user.js';

export const userRouter = express.Router();

userRouter.post('/add', setUser);
userRouter.post('/get', getUser);
userRouter.post('/login', authenticateUser);

