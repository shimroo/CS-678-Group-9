import React from 'react';
import '../styles/login.css';
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';


const Login: React.FC = () => {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    
    const { login, isLoading, error } = useLogin()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        login(name, age)
    }


    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name " onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="age" id="age" name="age" placeholder="Enter your age" onChange={(e) => setAge(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button type="submit" disabled = {isLoading} >Login</button>
                </div>
                <div className="form-group signup-link" onClick={() => window.location.href = '/signup'}>
                    Register Responder?
                </div>
                Please only use this page if you are one of the admins
            </form>
        </div>
    );
};

export default Login;
