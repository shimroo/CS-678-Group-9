import { Auction } from "../models/auction.js";
import { User } from "../models/user.js";



//Specific Auction Page (needs socket)              Tested(1)
export const getAuction = async (req, res) => {                     //Basic getter
    const { id } = req.body;
    try {
        console.log("finding auction");
        const auction = await Auction.findById(id);
        if (!auction) {
            console.log("auction not found");
            return res.status(400).json({ error: "Auction does not exist" });
        }
        console.log("auction found");
        return res.status(200).json(auction);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const placeBid = async (req, res) => {       //inlcude socket                       //place a bid on an auction
    const { title, username, bid } = req.body;
    try {
        const auction = await Auction.findOne ({ title });
        if (!auction) {
            return res.status(400).json({ error: "Auction does not exist" });
        }
        if (auction.end_time < new Date()) {
            return res.status(400).json({ error: "Auction has ended" });
        }
        if (bid <= auction.current_bid) {
            return res.status(400).json({ error: "Bid must be higher than current bid" });
        }
        if (auction.created_by == username) {
            return res.status(400).json({ error: "You cannot bid on your own auction" });
        }
        if (auction.current_bidder == username) {
            return res.status(400).json({ error: "You are already the highest bidder" });
        }

        auction.current_bid = bid;
        auction.current_bidder = username;
        await auction.save();
        return res.status(200).json(auction);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Create Auction Page                               Tested
export const createAuction = async (req, res) => {                  //creates a new auction for a specific user
    const { username, title, description, starting_bid, end_time } = req.body;
    try {
        console.log(username);
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const auction = await Auction.findOne ({ title });
        if (auction) {
            return res.status(400).json({ error: "Auction already exists" });
        }

        const new_auction = await Auction.create({ title, description, starting_bid, current_bid: starting_bid, start_time: new Date(), end_time, owned_by: user._id, current_bidder: user._id, created_by: user._id});   
        
        console.log("new auction created");
        return res.status(201).json(new_auction);
    }
    catch (error) {
        console.log("auction not created");
        return res.status(500).json({ error: error.message });
    }
}

//Browse page                                       Tested
export const getOngoing = async (req, res) => {             //get all ongoing auctions
    try {
        const auctions = await Auction.find({ end_time: { $gt: new Date() } });
        console.log(auctions.length + " ongoing auctions found");
        return res.status(200).json(auctions);
    }
    catch (error) {
        console.log("error getting ongoing auctions");
        return res.status(500).json({ error: error.message });
    }
}

export const searchAuctions = async (req, res) => {                 //serach for ongoing auctions by title
    const { title } = req.body;
    try {
        const auctions = await Auction.find({ title: { $regex: title, $options: 'i' }, end_time: { $gt: new Date() } });
        console.log(auctions.length + " auction matches found");
        return res.status(200).json(auctions);
    }
    catch (error) {
        console.log("error searching auctions");
        return res.status(500).json({ error: error.message });
    }
}

//My Profile page                                   Tested  
export const getMyAuctions = async (req, res) => {                  //auctions created by a specific user
    const { username } = req.body;
    try {
        const user = await User.findOne ({ username }); 
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        const auctions = await Auction.find({ created_by: user._id });
        console.log(auctions.length + " created auctions by id " + user._id);
        return res.status(200).json(auctions);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getMyListings = async (req, res) => {                 //get all auctions for a specific user 
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        const auctions = await Auction.find({ owned_by: user._id });
        console.log(auctions.length + " auctions found for id " + user._id);
        return res.status(200).json(auctions);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
