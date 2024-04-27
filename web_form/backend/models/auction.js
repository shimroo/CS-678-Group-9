import mongoose from "mongoose";
import { User } from "./user.js";

const auctionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    starting_bid: { type: Number, required: true },
    current_bid: { type: Number, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    owned_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    current_bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

    });

export const Auction = mongoose.model('Auction', auctionSchema);