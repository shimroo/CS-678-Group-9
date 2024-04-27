import mongoose from 'mongoose';
import { Auction } from './auction.js';

const userSchema = new mongoose.Schema({
    name : { type: String, required: true },
    username : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    item_count : { type: Number, default: 0 }
});

export const User = mongoose.model('User', userSchema);