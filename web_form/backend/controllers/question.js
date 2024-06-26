import { Question } from "../models/question.js";
import { Answer } from "../models/answers.js";


//add a question to the database
export const addQuestion = async (req, res) => {
    const { section, statement, options, type } = req.body;
    const question = new Question({ section, statement, options, type });
    try {
        await question.save();
        console.log("Question created: "+question.statement);
        res.status(201).json(question);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//get questions for a section to display
export const getQuestion = async (req, res) => {
    const { section } = req.body;
    // console.log(req.body);
    try {
        console.log("Finding questions for section: "+section);
        const questions = await Question.find({ section });
        console.log("Questions found: "+questions.length);
        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

