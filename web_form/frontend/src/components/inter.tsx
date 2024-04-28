import React, { useState } from 'react';
import '../styles/createquestion.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuth';
import axios from 'axios';


interface User {
    crt: string;
    dl: string;
    mr: string;
    type: string;
    rate1: string;
    rate2: string;
}



const Inter: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const user_id = user?._id;
    const [displayText, setDisplayText] = useState('');
    const [inputText, setInputText] = useState('');
    const [Loading, setLoading] = useState<boolean>(true);   
    const [User_full, setUser] = useState<User>();    


    const fetchText = async () => {
        try {
            const response = await axios.post('http://localhost:8000/user/getInter', {user_id});
            setUser(response.data.user);
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
                <div className="login-form">
                    <div className="displayText">
                        User Info:
                        <div className="inputForm">
                            Crt: {User_full?.crt},
                            Dl: {User_full?.dl},
                            Mr: {User_full?.mr},
                            Type: {User_full?.type},
                            Rate1: {User_full?.rate1},
                            Rate2: {User_full?.rate2}

                        </div>
                    </div>
                </div>
                <div className="login-form">
                    <div className="displayText">
                        shots:
                        <div className="inputForm">
                            My name is Rafay
                        </div>
                    </div>
                </div>
                <div className="login-form">
                    <div className="displayText">
                        Stance 1:
                        <div className="inputForm">
                            My name is Rafay
                        </div>
                    </div>
                </div>
                <div className="login-form">
                    <div className="displayText">
                    Stance 2:
                        <div className="inputForm">
                            My name is Rafay
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default Inter;
