import React from 'react';
import '../styles/home.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthContext } from '../hooks/useAuth';

const Home: React.FC = () => {

    const { user } = useAuthContext();
    const navigate = useNavigate();
    const browse = () => {
        navigate('/browse');
    }
    const username = user?.username;

    return (
        <body>
            <Navbar /> 
            
            <div className="container">
                <div>
                    <p className='home_h1'>Hello, {username}! Welcome to BidMe</p>
                    <p className="home_subtitle">Discover unique items and bid to win!</p>
                    <button className="join" onClick={browse} >Browse Auctions</button>
                </div>
            </div>
        </body>
    );
};

export default Home;
