import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuth";
import Navbar from './Navbar';

interface Question {
  _id: string;
  section: string;
  statement: string;
  options: string[];
}

const QuestionPage: React.FC<{ section: string }> = ({ section }) => {

  const {user} = useAuthContext();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    // Fetch questions for the specified section from the backend
    console.log("idk man user = ", user);

    const fetchQuestions = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/question/get`, { section });
        setQuestions(response.data);
        // Initialize answers array with empty strings for each question
        setAnswers(new Array(response.data.length).fill(""));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [section, user]);

  const handleAnswerChange = (index: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);

    console.log("Answers:", answers);
  };

  const handleAnswerSubmit = () => {
    try {
      const response = axios.post(`http://localhost:8000/question/submit`, { user_id: user._id, section, answers });
      console.log("Answers submitted successfully");
      handleSubmit();
    } catch (error) {
      console.error("Error submitting answers");      
    }
  }

  const handleSubmit = () => {
    let nextSection = 1;     
    if (section >= "1" && section <= "3") {
      nextSection = parseInt(section) + 1;
    } else if (section === "4") {
      nextSection = 6;
    }

    navigate(`/section${nextSection}`);
    console.log("Navigating to /section" + nextSection);
  };

  return (
    <body>
      <Navbar /> 
      <div className="question-container">
        <h2>Section: {section}</h2>
        <form onSubmit={handleAnswerSubmit}>
          {questions.map((question, index) => (
            <div className="question" key={question._id}>
              <h3>Question {index + 1}</h3>
              <p>{question.statement}</p>
              <select
                className="question-select"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              >
                <option value="">Select an option</option>
                {question.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button type="submit" className="question-submit">Submit</button>
        </form>
      </div>
    </body>
  );
};

export default QuestionPage;