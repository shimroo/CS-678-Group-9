import React from 'react';
import '../styles/navbar.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const Navbar: React.FC = () => {

    const navigate = useNavigate();
    const logout = useLogout().logout;

    const myprofile = () => {
        navigate('/profile');
    }

    return (
        <div>
            <ul className="navbar_container">
                <span className="navbar_sub-container">
                    <li onClick={() => navigate('/home')}>Home</li>
                </span>
                <span className="navbar_sub-container"> 
                    <li className="logout" onClick={myprofile}>My Profile</li>
                    <li className="logout" onClick={logout}>Logout</li>
                </span>
            </ul>
        </div>
    );
};

export default Navbar;
