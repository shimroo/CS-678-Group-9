import { User } from "../models/user.js";
import { Answer } from "../models/answers.js";

//simple setter
export const setUser = async (req, res) => {                    
    const { name, age, gender } = req.body;
    try {
        const user = await User.findOne ({ name });
        console.log(user);
        if (user && user.name === name && user.age === parseInt(age)) {
            console.log("User with same name and age already exists");
            return res.status(400).json({ error: "User with same name and age already exists" });
        }        

        const newUser = await User.create({ name, age, gender });
        console.log("user created: " + newUser.name);
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.log("user not created", error.message);
        return res.status(500).json({ error: error.message });
    }
}

//simple getter
export const getUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        console.log("details of user with id " + id + " sent");
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//simple authenticator
export const authenticateUser = async (req, res) => {
    const { name, age } = req.body;
    try {
        console.log("Authenticating user: " + name);
        const ageInt = parseInt(age);
        const user = await User.findOne({ name, age: ageInt });
        if (!user) {
            console.log("User does not exist");
            return res.status(400).json({ error: "User does not exist" });
        }
        console.log("user authenticated");
        return res.status(200).json(user);
    }
    catch (error) {
        console.log("user not authenticated", error.message);
        return res.status(500).json({ error: error.message });
    }
}

export const userAnswer = async(req, res)=> {
    const {userId, stance, rating} = req.body;
    //sequence of data: 
    // Gender, Age, Status, crtScore, dlScore, MR, Stance, Rating

    const user = await User.findOne({userId});
    if(!user){
        console.log("User not found!");
        return res.status(404)
    }

    const CRT = await Answer.findOne({user_id: userId, section: 1})
    if(!CRT){
        console.log("CRT record not found for this user!")
        return res.status(404)
    }
    // calculate CRT score
    const crtScore = 0;
    if(CRT.answers[0] === "First"){crtScore++;}
    if(CRT.answers[1] === "8"){crtScore++;}
    if(CRT.answers[2] === "Emily"){crtScore++;} 
    if(CRT.answers[3] === "5 Minutes"){crtScore++;}
    if(CRT.answers[4] === "47 Days"){crtScore++;}

    const DL = await Answer.findOne({user_id: userId, section: 2})
    if(!DL){
        console.log("DL record not found for this user!")
    }
    const dlScore = 0;
    if(DL.answers[0]==="I was able to connect"){dlScore++}
    if(DL.answers[1]==="I was able to open my mobile browser"){dlScore++}
    if(DL.answers[2]!=="I was unable to lookup"){dlScore++} 
    if(DL.answers[3]==="I was able to open a new tab in the browser"){dlScore++}
    if(DL.answers[4]!=="I was unable to perform this task"){dlScore++}
    if(DL.answers[5]==="I was able to bookmark a webpage"){dlScore++}
    if(DL.answers[6]==="I was to clear all cache and cookies from my browser"){dlScore++}


    const MR = await Answer.findOne({user_id: userId, section:3})
    const mrScore = 0;
    if(MR.answers[0]==="yes"){mrScore++}
    if(MR.answers[1]==="old"){mrScore++}
    if(MR.answers[2]==="valuable"){mrScore++}
    if(MR.answers[3]==="valid"){mrScore++}
    if(MR.answers[4]==="yes"){mrScore++}

    const answer = {
        gender: user.gender,
        age: user.age,
        status: user.status,
        crtScore: crtScore,
        dlScore: dlScore,
        mrScore: mrScore,
        stance: stance,
        rating: rating,
    }
    
} 