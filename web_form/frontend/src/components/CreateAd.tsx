import React, { useState } from 'react';
import '../styles/createquestion.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuth';
import axios from 'axios';

const CreateAd: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const user_id = user?._id;
    const [displayText, setDisplayText] = useState('');
    const [inputText, setInputText] = useState('');
    const [Loading, setLoading] = useState<boolean>(true);          


    const fetchText = async () => {
        try {
            const response = await axios.post('http://localhost:8000/Ad/get', {user_id});
            if (response.data) {
                setDisplayText(response.data.text);
            } else {
                setLoading(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useState(() => {
        fetchText();
    });


    // Handle input submission to the backend
    const handleInputSubmit = () => {
        axios.post('/api/save-input', { inputText })
            .then(response => {
                alert('Input saved successfully!');
            })
            .catch(error => console.error('Error saving input', error));
    };

    return (
        <body>
            <Navbar />
            <div className="container">
                <div className="displayText">
                    <p>{displayText}</p>
                    <div className="inputForm">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter Ad"
                        />
                        <button onClick={handleInputSubmit}>Submit</button>
                    </div>
                    <div className="inputForm">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter Ad 2"
                        />
                        <button onClick={handleInputSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default CreateAd;
