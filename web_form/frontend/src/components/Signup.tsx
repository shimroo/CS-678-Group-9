import React from 'react';
import '../styles/signup.css'; // Import the CSS file for styling
import { useSignup } from '../hooks/useSignup';
import { useState } from 'react';

const Signup: React.FC = () => {

    const { signup, isLoading, error } = useSignup()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        signup(name, username, password)
    }

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your username" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="submit">Sign Up</button>
                </div>
                <div className="form-group signup-link">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </form>
        </div>
    );
};

export default Signup;
