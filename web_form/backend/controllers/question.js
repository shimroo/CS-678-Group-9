import { Question } from "../models/question.js";

export const addQuestion = async (req, res) => {
    const { section, statement, options } = req.body;
    const question = new Question({ section, statement, options });
    try {
        await question.save();
        console.log("Question created: "+question.statement);
        res.status(201).json(question);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getQuestion = async (req, res) => {
    const { section } = req.body;
    try {
        console.log("Finding questions for section: "+section);
        const questions = await Question.find({ section });
        console.log("Questions found: "+questions.length);
        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const submitAnswers = async (req, res) => {
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
