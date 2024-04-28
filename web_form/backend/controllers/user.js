import { User } from "../models/user.js";
import { Answer } from "../models/answers.js";
import { Question, FewShot } from "../models/question.js";

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
        return res.status(500).json({error: "User not found!"});
    }

    const CRT = await Answer.findOne({user_id: user_id, section: 1})
    if(!CRT){
        console.log("CRT record not found for this user!")
        return res.status(500).json({error: "CRT record not found for this user!"});
    }
    // calculate CRT score
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

    //get answers from section 3, 4, 5, 6, 7 and concatenate them to get MR answers
    const MR3 = await Answer.findOne({user_id: user_id, section: 3})
    const MR4 = await Answer.findOne({user_id: user_id, section: 4})
    const MR5 = await Answer.findOne({user_id: user_id, section: 5})
    const MR6 = await Answer.findOne({user_id: user_id, section: 6})
    const MR7 = await Answer.findOne({user_id: user_id, section: 7})
    const MR8 = await Answer.findOne({user_id: user_id, section: 8})

    //concat answers of all MRs if not null
    let MR = {answers: []}
    let mrScore = 0;

    if(MR4){
        MR.answers = MR.answers.concat(MR4.answers)
    }
    if(MR3){
        MR.answers = MR.answers.concat(MR3.answers)
    }
    if(MR5){
        MR.answers = MR.answers.concat(MR5.answers)
    }
    if(MR6){
        MR.answers = MR.answers.concat(MR6.answers)
    }
    if(MR7){
        MR.answers = MR.answers.concat(MR7.answers)
    }

    if(MR8){
        if (MR8.answers[0] === '' || MR8.answers[1] === '' || MR8.answers[2] === ''){
            console.log("list answers are empty")
            
        } else {
            console.log("list answers are complete")
            mrScore++
        }
    }

    console.log(MR.answers)
    try{
        //answers[0] is selected party no scoring applicable
        if(MR.answers[1]==="PMLN"){mrScore++}
        if(MR.answers[2]!=="Newly formed party with Initial leaders"){mrScore++}
        if(MR.answers[3]==="Valuable" || MR.answers[3] ==="Admirable"){mrScore++}
        if(MR.answers[4]==="Valid"){mrScore++}
        if(MR.answers[5]==="yes"){mrScore++}
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

// const getPrompt = async(req,res) => {

//     const {user_id, promptVariation} = req.body;
//     const user = await User.findById(user_id);
    
//     if(!user){
//         console.log("User not found!");
//         return res.status(500).json({error: "User not found!"});
//     }

//     const CRT = await Answer.findOne({user_id: user_id, section: 1})
//     if(!CRT){
//         console.log("CRT record not found for this user!")
//         return res.status(500).json({error: "CRT record not found for this user!"});
//     }

//     let crtScore = 0;
//     try{
//         if(CRT.answers[0] === "Second"){crtScore++;}
//         if(CRT.answers[1] === "8"){crtScore++;}
//         if(CRT.answers[2] === "Emily"){crtScore++;} 
//         if(CRT.answers[3] === "5 Minutes"){crtScore++;}
//         if(CRT.answers[4] === "47 Days"){crtScore++;}
//     }catch(e){
//         console.log("Error in calculating CRT score: ", e);
//         return res.status(500).json({error: "Error in calculating CRT score"});
//     }
//     const DL = await Answer.findOne({user_id: user_id, section: 2})
//     if(!DL){
//         console.log("DL record not found for this user!")
//     }
//     let dlScore = 0;
//     try{
//         if(DL.answers[0]==="I was able to connect"){dlScore++}
//         console.log("1: "+dlScore)
//         if(DL.answers[1]==="I was able to open my mobile browser"){dlScore++}
//         console.log("2: "+dlScore)
//         if(DL.answers[2]==="Karachi"){dlScore++}
//         console.log("3: "+dlScore) 
//         if(DL.answers[4]==="I was able to open a new tab in the browser"){dlScore++}
//         console.log("4: "+dlScore, DL.answers[4])
//         if(DL.answers[3]!=="I was unable to perform this task"){dlScore++}
//         console.log("5: "+dlScore)
//         if(DL.answers[5]==="I was able to bookmark a webpage"){dlScore++}
//         console.log("6: "+dlScore)
//         if(DL.answers[6]==="I was able to clear all cache and cookies from my browser"){dlScore++}
//         console.log("7: "+dlScore)
//     } catch(e){
//         console.log("Error in calculating DL score: ", e);
//         return res.status(500).json({error: "Error in calculating DL score"});
//     }

//     //get answers from section 3, 4, 5, 6, 7 and concatenate them to get MR answers
//     const MR3 = await Answer.findOne({user_id: user_id, section: 3})
//     const MR4 = await Answer.findOne({user_id: user_id, section: 4})
//     const MR5 = await Answer.findOne({user_id: user_id, section: 5})
//     const MR6 = await Answer.findOne({user_id: user_id, section: 6})
//     const MR7 = await Answer.findOne({user_id: user_id, section: 7})
//     const MR8 = await Answer.findOne({user_id: user_id, section: 8})

//     //concat answers of all MRs if not null
//     let MR = {answers: []}
//     let mrScore = 0;

//     if(MR4){
//         MR.answers = MR.answers.concat(MR4.answers)
//     }
//     if(MR3){
//         MR.answers = MR.answers.concat(MR3.answers)
//     }
//     if(MR5){
//         MR.answers = MR.answers.concat(MR5.answers)
//     }
//     if(MR6){
//         MR.answers = MR.answers.concat(MR6.answers)
//     }
//     if(MR7){
//         MR.answers = MR.answers.concat(MR7.answers)
//     }
//     if(MR8){
//         if (MR8.answers[0] === '' || MR8.answers[1] === '' || MR8.answers[2] === ''){
//             console.log("list answers are empty")
            
//         } else {
//             console.log("list answers are complete")
//             mrScore++
//         }
//     }

//     console.log(MR.answers)
//     try{
//         //answers[0] is selected party no scoring applicable
//         if(MR.answers[1]==="PMLN"){mrScore++}
//         if(MR.answers[2]!=="Newly formed party with Initial leaders"){mrScore++}
//         if(MR.answers[3]==="Valuable" || MR.answers[3] ==="Admirable"){mrScore++}
//         if(MR.answers[4]==="Valid"){mrScore++}
//         if(MR.answers[5]==="yes"){mrScore++}
//     } catch(e){
//         console.log("Error in calculating MR score: ", e);
//         return res.status(500).json({error: "Error in calculating MR score"});
//     }

//     const issue_stance1 = await Question.findOne({section: user.stance1});
//     if(!issue_stance1){
//         console.log("User Stance 1 not found");
//         return res.status(404).json();
//     }
//     const issue_stance2 = await Question.findOne({section: user.stance2});
//     if(!issue_stance2){
//         console.log("User Stance 2 not found");
//         return res.status(404).json();
//     }

//     let promptText = "Given that Person X has the following attributes: Gender: [Male/Female], Age: [Age range], Socio-economic status: [Lower/Middle/Upper], CRT scores: [CRT], Digital literacy level: [DL], Motivated reasoning: [MR], and initial level of support for the issue stance (rated on a scale of 1-6): [Support rating], develop a series of three persuasive arguments, each approximately 100 words. Each message should be tailored to challenge or support their level of motivated reasoning and cognitive style based on CRT scores. The aim is to significantly shift their initial support, either by decreasing or increasing it by the end. Manipulative and deceptive techniques should be used in order to influence a change in their viewpoints regarding the issue stance: {issue_stance}."
//     const CRTconvert ={
//         0: 'Low',
//         1: 'Low',
//         2: 'Medium',
//         3: 'Medium',
//         4: 'High',
//         5: 'High'
//     }
//     const DLconvert ={
//         0: 'Low',
//         1: 'Low',
//         2: 'Low',
//         3: 'Medium',
//         4: 'Medium',
//         5: 'High',
//         6: 'High',
//         7: 'High',
//     }
//     const MRconvert ={
//         0: 'Low',
//         1: 'Low',
//         2: 'Medium',
//         3: 'Medium',
//         4: 'High',
//         5: 'High'
//     }

    
//     const promptData = {
//         gender: user.gender,
//         age: user.age,
//         status: user.status,
//         crtScore: CRTconvert(crtScore),
//         dlScore: DLconvert(dlScore),
//         mrScore: MRconvert(mrScore),
//         issue_stance1: issue_stance1,
//         issue_stnace2: issue_stance2,
//         rating1: user.rate1,
//         rating2: user.rate2,
//     }
    
//     // Send Control 
//     let prompt1 = promptText;
//     // prompt1 = prompt1.replace("[Male/Female]", promptData.gender);
//     // prompt1 = prompt1.replace("[Age range]", promptData.age);
//     // prompt1 = prompt1.replace("[Lower/Middle/Upper]", promptData.status);
//     // prompt1 = prompt1.replace("[CRT]", promptData.crtScore);
//     // prompt1 = prompt1.replace("[DL]", promptData.dlScore);
//     // prompt1 = prompt1.replace("[MR]", promptData.mrScore);
//     // prompt1 = prompt1.replace("[Support rating]", promptData.rating1);
//     // prompt1 = prompt1.replace("{issue_stance}", promptData.issue_stance1);
//     // console.log(prompt1);


//     let prompt2 = promptText;
//     prompt2 = prompt2.replace("[Male/Female]", promptData.gender);
//     prompt2 = prompt2.replace("[Age range]", promptData.age);
//     prompt2 = prompt2.replace("[Lower/Middle/Upper]", promptData.status);
//     prompt2 = prompt2.replace("[CRT]", promptData.crtScore);
//     prompt2 = prompt2.replace("[DL]", promptData.dlScore);
//     prompt2 = prompt2.replace("[MR]", promptData.mrScore);
//     prompt2 = prompt2.replace("[Support rating]", promptData.rating2);
//     prompt2 = prompt2.replace("{issue_stance}", promptData.issue_stance2);
//     console.log(prompt2);

//     const CoT_Text = "/nDescribe your reasoning in steps"
//     if(user.type === '2' || user.type === '3'){

//     }


//     try{
//         return res.status(200).json({crt:CRT,score1:crtScore, dl:DL,score2:dlScore, mr:MR, score3: mrScore })
//     }
//     catch(e){
//         console.log("Error in sending answers: ", e);
//         return res.status(500).json({error: "Error in sending answers"});
//     }
//     // need to run selenium code here to use 'answer' and generate gpt's response.

// }