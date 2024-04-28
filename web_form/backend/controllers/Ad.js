import { Ad } from "../models/Ad.js";
import { User } from "../models/user.js";



//simple setter
export const setAd = async (req, res) => {                  
    const { prompt, content, stance, type, user_id } = req.body;

    try {
        console.log("Creating Ad");
        const ad = await Ad.findOne({ user_id, stance });
        if (ad) {
            console.log("Ad already exists, returning existing ad");
            return res.status(202).json(ad);
        }

        const new_ad = await Ad.create({ prompt, content, stance, type, user_id });
        console.log("new Ad created");
        return res.status(200).json(new_ad);
    }
    catch (error) {
        console.log("Error creating Ad: " + error);
        return res.status(500).json({ error: error });
    }
}


//simple getter
export const getAd = async (req, res) => {
    const { user_id, stance } = req.body;

    try {
        console.log("Getting Ad");
        const ad = await Ad.findOne({ user_id, stance });
        if (!ad) {
            console.log("Ad not found");
            return res.status(404).json({ error: "Ad not found" });
        }
        console.log("Ad found");
        return res.status(200).json(ad);
    } catch (error) {
        console.log("Error getting Ad: " + error);
        return res.status(500).json({ error: error });
    }
}


//save ad
export const saveAd = async (req, res) => {
    const { user_id, stance, content } = req.body;

    try {
        const ad = await Ad.findOne({ user_id, stance });
        if (ad.content !== "") {
            console.log("Ad content is not empty saving failed");
            return res.status(400).json({ error: "Ad content is empty, cannot save" });
        }
        ad.content = content;
        ad.save();
        console.log("Ad saved");
        return res.status(200).json(ad);
    } catch (error) {
        console.log("Error saving Ad: " + error);
        return res.status(500).json({ error: error });
    }
}
