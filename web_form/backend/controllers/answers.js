import { Question } from "../models/question.js";
import { Answer } from "../models/answers.js";

//get all questions to check for previously answered sections
export const getAnswers = async (req, res) => {
    const { user_id, section } = req.body;
    try {
        const answers = await Answer.findOne({ user_id, section });
        if (answers === null) {
            console.log("No answers found for section: "+section);
            res.status(202).json({ message: "No answers found for section: "+section });
            return;
        }
        console.log("Already answered for section: "+section);
        res.status(200).json(answers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//store answers for a section
export const submitAnswers = async (req, res) => {
    const { user_id, section, answers } = req.body;
    const answer = new Answer({ user_id, section, answers });
    try {
        await answer.save();
        console.log("Answers submitted for section: "+section + " by user: "+user_id);
        res.status(201).json(answer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//know whether user can enlist three achievements
export const getlist = async (req, res) => {
    const { user_id } = req.body;
    try {
        // console.log("Finding list for user: "+user_id);
        //see if user selected a specific option in section 5,6,7
        const answer = await Answer.findOne({ user_id , section: { $in: ['5','6','7'] } });
        if (answer === null) {
            console.log("No answer found for user: "+user_id);
            res.status(202).json({ message: "No answer found for user: "+user_id });
            return;
        }
        if (answer.answers[2] === "Yes, I can enlist three achievements." ) {
            console.log("User can enlist three achievements: "+user_id);
            res.status(200).json({ message: "User can enlist three achievements: "+user_id });
            return;
        }
         
        console.log("user wont answer 3 things"+user_id, answer[2]);
        res.status(202).json(answer);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getActualAnswers = async (req, res) => {
    const { user_id, section } = req.body;
    console.log("Finding actual answers for section: "+section);
    try {
        const answers = await Answer.findOne({ user_id, section });
        if (answers === null) {
            console.log("No answers found for section: "+section);
            res.status(202).json({ message: "No answers found for section: "+section });
            return;
        }
        console.log("Answers found for section: "+section);
        return res.status(200).json(answers);

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}   