import { Question } from "../models/question.js";
import { Answer } from "../models/answers.js";

export const getAnswers = async (req, res) => {
    const { user_id, section } = req.body;
    try {
        console.log("Finding answers for section: "+section);
        const answers = await Answer.findOne({ user_id, section });
        console.log("Already answered for section: "+section);
        res.status(200).json(answers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const submitAnswers = async (req, res) => {
    const { user_id, section, answers } = req.body;
    const answer = new Answer({ user_id, section, answers });
    try {
        await answer.save();
        console.log("Answers submitted for section: "+section);
        res.status(201).json(answer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}