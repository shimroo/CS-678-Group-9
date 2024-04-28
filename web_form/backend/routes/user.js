import express from 'express';
import { getUser, setUser, authenticateUser, userAnswer, updateUser, getInter} from '../controllers/user.js';

export const userRouter = express.Router();

userRouter.post('/add', setUser);
userRouter.post('/get', getUser);
userRouter.post('/login', authenticateUser);
userRouter.post('/userAnswer', userAnswer);
userRouter.post('/update', updateUser);
userRouter.post('/getInter', getInter);

