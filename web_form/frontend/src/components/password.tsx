import React from 'react';
import '../styles/password.css'; 
import Navbar from './Navbar';
import { useAuthContext } from '../hooks/useAuth';
import { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';

const PasswordChange: React.FC = () => {
    
    const { user } = useAuthContext();
    const username = user?.username
    const { logout } = useLogout();
    const [password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/user/change', {username, password, new_password});

            if (response.status === 200) {
                alert('Password changed successfully');
                logout();
            } else {
                alert('Wrong Password');
            }
        } catch (error) {
            alert('Failed to change password');
        }
    };

    return (
        <body>
            <Navbar />
            <div className="container">
                <h1>Welcome, {username}</h1>
                <form className="password-change-form" onSubmit={handleSubmit}>
                    <h2>Change Password</h2>
                    <div className="form-group">
                        <label htmlFor="oldPassword">Old Password</label>
                        <input type="password" id="oldPassword" name="oldPassword" placeholder="Enter your old password" required onChange={(e) => setOldPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" id="newPassword" name="newPassword" placeholder="Enter your new password" required onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button type="submit">Change Password</button>
                    </div>
                </form>
            </div>
        </body>
    );
};

export default PasswordChange;
