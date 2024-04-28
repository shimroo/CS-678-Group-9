import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuth";
import Navbar from './Navbar';
import '../styles/FormPage.css';

interface Question {
  _id: string;
  section: string;
  statement: string;
  options: string[];
  type:string;
}

const QuestionPage: React.FC<{ section: string }> = ({ section }) => {

  const {user} = useAuthContext();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [additionalFields, setAdditionalFields] = useState(0);

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

    const getSection = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/answer/get`, { user_id: user._id, section });
        if (response.status === 200) {
          console.log("Section already completed");
          handleSubmit();
        } else {
          console.log("Section not completed yet");
          fetchQuestions();
        }
        // fetchQuestions();
      } catch (error) {
        console.error("Error fetching section:", error);
      }
    }
    
    getSection();
  }, [section, user]);

  const handleAnswerChange = (index: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);

    console.log("Answers:", answers);
  };

  const handleAnswerSubmit = async (event:any) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(`http://localhost:8000/answer/submit`, { user_id: user._id, section, answers });
      console.log("Answers submitted successfully");
      handleSubmit();
    } catch (error) {
      console.error("Error submitting answers:", error);      
    }
  }


    const handleAddField = () => {
      if (additionalFields <3) {
        setAdditionalFields(additionalFields + 1);
      }
    };
  

  

  const handleSubmit = async () => {
    let nextSection = parseInt(section) + 1;     

    if (section === "4") {
      switch (answers[0]) {
        case "PMLN":
          nextSection = 6;
          break;
        case "PTI":
          nextSection = 5;
          break;
        case "PPP":
          nextSection = 7;
          break;
        default:
          nextSection = 9;
          break;
      }
    }
    navigate(`/section${nextSection}`);
    console.log("Navigating to /section" + nextSection);
  };

  return (
    <div>
      <Navbar />
      <div className="question-container">
        <h2>Section: {section}</h2>
        <form onSubmit={handleAnswerSubmit}>
          {questions.map((question, index) => (
            <fieldset className="question" key={question._id}>
              <p>{question.statement}</p>
              {question.type === "0" ? (
                question.options.map((option, optionIndex) => (
                  <div className="radio-option" key={optionIndex}>
                    <input
                      type="radio"
                      id={`question-${index}-${optionIndex}`}
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                    <label htmlFor={`question-${index}-${optionIndex}`}>{option}</label>
                  </div>
                ))
              ) : (
                <>
                  {[...Array(additionalFields)].map((_, textIndex) => (
                    <input
                      key={`question-${index}-${textIndex}`}
                      type="text"
                      id={`question-${index}-${textIndex}`}
                      name={`question-${index}`}
                      value={answers[textIndex] || ''}
                      onChange={(e) => handleAnswerChange(textIndex, e.target.value)}
                      className="text-input"
                    />
                  ))}
                  {additionalFields <3 && (
                    <button type="button" onClick={handleAddField}>
                      Add Field
                    </button>
                  )}
                </>
              )}
            </fieldset>
          ))}
          <button type="submit" className="question-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default QuestionPage;