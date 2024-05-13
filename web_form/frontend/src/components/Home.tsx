import React from 'react';
import '../styles/home.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthContext } from '../hooks/useAuth';

const Home: React.FC = () => {

    const { user } = useAuthContext();
    const navigate = useNavigate();
    const browse = () => {
        navigate('/section1') 
    }
    const Urdu = () => {
        navigate('/section1') 
    }
    const Ad = () => {
        navigate('/show') 
    }
    const username = user?.username;

    return (
        <body>
            <Navbar /> 
            
            <div className="container">
                <div>
                    <button className="join" onClick={browse} >English</button>
                    <button className="join" onClick={Urdu} >Urdu</button>
                    <button className="join" onClick={Ad} >Ad</button>
                </div>
            </div>
        </body>
    );
};

export default Home;
