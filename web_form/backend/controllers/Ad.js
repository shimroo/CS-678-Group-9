import { Ad } from "../models/Ad.js";
import { User } from "../models/user.js";


//simple getter
export const getAd = async (req, res) => {
    const { id } = req.body;
    try {
        console.log("Finding Ad");
        const ad = await Ad.findById(id);
        if (!ad) {
            console.log("Ad not found");
            return res.status(500).json({ error: "Ad does not exist" });
        }
        console.log("Sending Ad: " + ad.prompt);
        return res.status(200).json(ad);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//simple getter
export const setAd = async (req, res) => {                  
    const { prompt, content, user_id } = req.body;
    try {
        
        const newAd = await Ad.create({ prompt, content, user_id });
        console.log("Ad added to DB: " + newAd.prompt);

        return res.status(200).json(new_auction);
    }
    catch (error) {
        console.log("Ad not created");
        return res.status(500).json({ error: error.message });
    }
}

