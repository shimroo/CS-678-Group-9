import React from 'react';
import '../styles/login.css';
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';


const Login: React.FC = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const { login, isLoading, error } = useLogin()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        login(username, password)
    }


    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username " onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button type="submit" disabled = {isLoading} >Login</button>
                </div>
                <div className="form-group signup-link">
                    Don't have an account? <a href="/">Signup</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
