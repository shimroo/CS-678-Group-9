import { User } from "../models/user.js";
import { Answer } from "../models/answers.js";


function generateNumbers(min, max) {
    let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    
    let num2;
    do {
        num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (num2 === num1);

    return [num1, num2];
}

//add a responder to the database
export const setUser = async (req, res) => {                    
    const { name, age, gender, status} = req.body;
    // console.log(req.body)
    try {
        const user = await User.findOne ({ name });
        // console.log(user);

        if (user && user.name === name && user.age === parseInt(age)) {
            console.log("User with same name and age already exists");
            return res.status(400).json({ error: "User with same name and age already exists" });
        }    
        let [num1, num2] = generateNumbers(1,5);
        const numToString = {
            1: 'a',
            2: 'b',
            3: 'c',
            4: 'd',
            5: 'e',
        };
        const stance1 = numToString[num1]
        const stance2 = numToString[num2]

        const newUser = await User.create({ name, age, gender,status,stance1:stance1, stance2:stance2});
        // console.log(newUser);
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

//grade the user's answers
export const userAnswer = async (req, res)=> {
    const {user_id} = req.body;
    const user = await User.findById(user_id);
    
    if(!user){
        console.log("User not found!");
        return res.status(404)
    }

    const CRT = await Answer.findOne({user_id: user_id, section: 1})
    if(!CRT){
        console.log("CRT record not found for this user!")
        return res.status(404)
    }

    let crtScore = 0;
    try{
        if(CRT.answers[0] === "Second"){crtScore++;}
        if(CRT.answers[1] === "8"){crtScore++;}
        if(CRT.answers[2] === "Emily"){crtScore++;} 
        if(CRT.answers[3] === "5 Minutes"){crtScore++;}
        if(CRT.answers[4] === "47 Days"){crtScore++;}
    }catch(e){
        console.log("Error in calculating CRT score: ", e);
        return res.status(500).json({error: "Error in calculating CRT score"});
    }
    const DL = await Answer.findOne({user_id: user_id, section: 2})
    if(!DL){
        console.log("DL record not found for this user!")
    }
    let dlScore = 0;
    try{
        if(DL.answers[0]==="I was able to connect"){dlScore++}
        console.log("1: "+dlScore)
        if(DL.answers[1]==="I was able to open my mobile browser"){dlScore++}
        console.log("2: "+dlScore)
        if(DL.answers[2]==="Karachi"){dlScore++}
        console.log("3: "+dlScore) 
        if(DL.answers[4]==="I was able to open a new tab in the browser"){dlScore++}
        console.log("4: "+dlScore, DL.answers[4])
        if(DL.answers[3]!=="I was unable to perform this task"){dlScore++}
        console.log("5: "+dlScore)
        if(DL.answers[5]==="I was able to bookmark a webpage"){dlScore++}
        console.log("6: "+dlScore)
        if(DL.answers[6]==="I was able to clear all cache and cookies from my browser"){dlScore++}
        console.log("7: "+dlScore)
    } catch(e){
        console.log("Error in calculating DL score: ", e);
        return res.status(500).json({error: "Error in calculating DL score"});
    }

    const MR = await Answer.findOne({user_id: user_id, section:3})
    let mrScore = 0;
    try{
        if(MR.answers[0]==="yes"){mrScore++}
        if(MR.answers[1]==="old"){mrScore++}
        if(MR.answers[2]==="valuable"){mrScore++}
        if(MR.answers[3]==="valid"){mrScore++}
        if(MR.answers[4]==="yes"){mrScore++}
    } catch(e){
        console.log("Error in calculating MR score: ", e);
        return res.status(500).json({error: "Error in calculating MR score"});
    }

    // const answer = {
    //     gender: user.gender,
    //     age: user.age,
    //     status: user.status,
    //     crtScore: crtScore,
    //     dlScore: dlScore,
    //     mrScore: mrScore,
    //     stance: stance,
    //     rating: rating,
    // }
    try{
        return res.status(200).json({crt:CRT,score1:crtScore, dl:DL,score2:dlScore, mr:MR, score3: mrScore })
    }
    catch(e){
        console.log("Error in sending answers: ", e);
        return res.status(500).json({error: "Error in sending answers"});
    }
    // need to run selenium code here to use 'answer' and generate gpt's response.
} 