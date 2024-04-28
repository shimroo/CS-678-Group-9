import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuth";
import Navbar from './Navbar';
import '../styles/FormPage.css';
import '../styles/profile.css'; // Import the CSS file for styling


const Profile: React.FC = () => {

    const { user } = useAuthContext();                                  //for user authentication
    const username = user?.username;                                     //for username
    const navigate = useNavigate();                                     //for navigation                   
    const [loading, setLoading] = React.useState<boolean>(true);        //for loading spinner
    const [err, setErr] = React.useState<boolean>(false);           //for error message
    const [CRTAnswers, setCRTAnswers] = useState<string[]>([]);
    const [DLAnswers, setDLAnswers] = useState<string[]>([]);
    const [MRAnswers, setMRAnswers] = useState<string[]>([]);
    const [CRTScore, setCRTScore] = useState('');
    const [DLScore, setDLScore] = useState('');
    const [MRScore, setMRScore] = useState('');
    const [stance1, setStance1] = useState('');
    const [stance2, setStance2] = useState('');


    

    const user_id = user._id;
    const fetchAnswers = async() => {
        try {
            const response = await axios.post(`http://localhost:8000/user/userAnswer`, {user_id});
            if (response.data) {
                setCRTAnswers(response.data.crt.answers);
                setDLAnswers(response.data.dl.answers);
                setMRAnswers(response.data.mr.answers);
                setCRTScore(response.data.score1)
                setDLScore(response.data.score2)
                setMRScore(response.data.score3)
            }
        } catch (error) {
            console.log(error);
            setErr(true);
        } finally {
            setLoading(false);
        }
    }

    const fetchStances = async () => {
        try {
            setLoading(true);
            const response1 = await axios.post(`http://localhost:8000/question/get`, {section: user.stance1});
            if(response1.data){
                setStance1(response1.data.questions)
            }
            const response2 = await axios.post(`http://localhost:8000/question/get`, {section: user.stance2});
            if(response2.data){
                setStance2(response2.data.questions)
            }

            console.log(response1.data);
            console.log(response2.data);
        } catch (error) {
            console.log(error);
            setErr(true);   
        } finally {
            setLoading(false);
        }
    }
    


    useEffect(() => {
        fetchAnswers();
        fetchStances();
    }, []);

    return (
        <body>
            <Navbar />
            <div className="profile_container">
                <div className="profile_profile-info">
                    <div className="profile_user-details">
                        <h2>Name: {user.name}</h2>
                        <p> age: {user.age}</p>
                        <p> gender: {user.gender}</p>
                        <p> status: {user.status}</p>
                        <p> stance 1: {user.stance1}</p>
                        <p> stance 2: {user.stance2 }</p>
                    </div>
                </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : err ? (
                        <p>Complete the missing sections of the form to see results</p>
                    ) : (
                        <>
                            <h3>User Answers: </h3>
                            <div className="profile_auction-list"> 
                            <p> CRT: </p>
                            <ul>
                                {CRTAnswers.map((answer, index) => (
                                    <li key={index}>{answer}</li>
                                ))}
                            </ul>
                            </div>
                            <div className="profile_auction_list">
                            <p style={{ fontWeight: "bold" }}> Score: {CRTScore}</p>
                            </div>

                            <div className="profile_auction-list"> 
                            <p> DL: </p>
                            <ul>
                                {DLAnswers.map((answer, index) => (
                                    <li key={index}>{answer}</li>
                                ))}
                            </ul>
                            </div>
                            <div className="profile_auction_list">
                            <p style={{ fontWeight: "bold" }}> Score: {DLScore}</p>
                            </div>

                            <div className="profile_auction-list"> 
                            <p> MR: </p>
                            <ul>
                                {MRAnswers.map((answer, index) => (
                                    <li key={index}>{answer}</li>
                                ))}
                            </ul>
                            </div>

                            <div className="profile_auction_list">
                            <p style={{ fontWeight: "bold" }}> Score: {MRScore}</p>
                            </div>
                        </>
                    )}
            </div>
        </body>
    );
};

export default Profile;
