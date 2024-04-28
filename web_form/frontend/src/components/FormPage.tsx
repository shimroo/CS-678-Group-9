import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuth";
import Navbar from './Navbar';
import '../styles/FormPage.css';
import { get } from "http";

interface Question {
  _id: string;
  section: string;
  statement: string;
  options: string[];
  type:string;    // 0 for radio, 1 for text, 2 for 'others' text
}

const QuestionPage: React.FC<{ section: string }> = ({ section }) => {

  const {user} = useAuthContext();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [additionalFields, setAdditionalFields] = useState(0);
  const [listBool, setListBool] = useState(false);

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

    const fetchStance = async ( stance_id: string) => {
      try {
        const response = await axios.post(`http://localhost:8000/question/get`, { section : stance_id });
        setQuestions(response.data);
        // Initialize answers array with empty strings for each question
        setAnswers(new Array(response.data.length).fill(""));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const getStanceNumber = async (stance_id: string) => {
      try {
        const response = await axios.post(`http://localhost:8000/user/get`, { id: user._id });
        if (response.status === 200) {
          if (stance_id === "1") {
            fetchStance(response.data.stance1);
          } else if (stance_id === "2") {
            fetchStance(response.data.stance2);
          }
        } else {
          console.log("Counld not fetch stance");
        }
      } catch (error) {
        console.error("Error fetching stance", error);
      }
    }
        


    

    const getSection = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/answer/get`, { user_id: user._id, section });
        if (response.status === 200) {
          console.log("Section already completed");
          handleSubmit();
        } else {
          console.log("Section not completed yet");
          if (section === "9") {
            getStanceNumber("1");
          } else if (section === "10") {
            getStanceNumber("2");
          } else {
            fetchQuestions();
          }
        }

      } catch (error) {
        console.error("Error fetching section:", error);
      }
    }

    const getList = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/answer/list`, { user_id: user._id});
        if (response.status === 200) {
          setListBool(true);
          console.log("list is to be filled");
        } else {
          console.log("list is not to be filled");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    const list_getter = async () => {
      await getList();
    }
    
    list_getter();   
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
        case "PTI":
          nextSection = 5;
          break;
        case "PMLN":
          nextSection = 6;
          break;
        case "PPP":
          nextSection = 7;
          break;
        default:
          nextSection = 8;
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
          {/* {questions.map((question, index) => (
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
          ))} */}
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
            ) : question.type === "1" ? (
              <>
                {[...Array(additionalFields)].map((_, textIndex) => (
                  <input
                    key={`question-${index}-${textIndex}`}
                    type="text"
                    id={`question-${index}-${textIndex}`}
                    name={`question-${index}`}
                    value={answers[textIndex] || ''}
                    onChange={(e) => handleAnswerChange(textIndex, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) { // Check if Enter key is pressed
                        e.preventDefault(); // Prevent default form submit on enter
                        if (textIndex === additionalFields - 1 && additionalFields < 3) {
                          handleAddField(); // Add new field only if it's the last field and fewer than 3 fields exist
                        } else if (textIndex === 2 && answers[0] && answers[1] && answers[2]) {
                          // Submit form here if all three fields are filled
                          console.log('Form is ready to be submitted');
                          // Add your submit function here
                        }
                      }
                    }}
                    className="text-input"
                  />
                ))}
                {additionalFields < 3 && (
                  <button type="button" onClick={handleAddField}>
                    Add Field
                  </button>
                )}
              </>
            
            ) : (
              <div>
                <input
                  list={`options-${index}`}
                  type="text"
                  id={`question-${index}`}
                  name={`question-${index}`}
                  value={answers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="text-input"
                />
                <datalist id={`options-${index}`}>
                  {question.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </datalist>
              </div>
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