import React, { useState } from 'react';
import '../styles/signup.css';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const { signup, isLoading, error } = useSignup();
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male'); // Default value for gender dropdown
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (parseInt(age) < 1) {
                console.log('Age must be above 14');
                return;
            }
            signup(name, age, gender);
            console.log('Signup successful');
            navigate('/login');

        } catch (error) {
            console.log('Signup failed');
        }
    };

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Register Responder</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} required />
                    {/* Basic check for name */}
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" name="age" placeholder="Enter your age" onChange={(e) => setAge(e.target.value)} required />
                    {/* Age should be a number */}
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" onChange={(e) => setGender(e.target.value)} value={gender} required>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit">Sign Up</button>
                </div>
                <div className="form-group signup-link" onClick={() => window.location.href = '/login'}>
                    Thanks for registering
                </div>
            </form>
        </div>
    );
};

export default Signup;
