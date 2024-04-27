import React, { useState } from 'react';
import '../styles/createquestion.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuth';
import axios from 'axios';

const CreateAuction: React.FC = () => {
    const navigate = useNavigate();
    const [section, setSection] = useState<number>(1);
    const [statement, setStatement] = useState<string>('');
    const [options, setOptions] = useState<string[]>(['']);
    const [type, setType] = useState<number>(1);

    // Function to add a new option field
    const addOption = () => {
        setOptions([...options, '']);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter') {
            addOption(); // Add a new option when Enter key is pressed
        }
    };

    // Function to handle changes in options
    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const createQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/question/add', { section, statement, options, type });
            console.log(response.data);
            alert('Question created successfully!');
            // Clear the form fields after successful submission
            setSection(section + 1); // Increment section number for the next question
            setStatement('');
            setOptions(['']);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <body>
            <Navbar />
            <div className="container">
                <form action="" onSubmit={createQuestion}>
                    <label> Create Question Page</label>
                    <label htmlFor="section">Section:</label>
                    <input type="number" id="section" name="section" min={1} value={section} onChange={(e) => setSection(parseInt(e.target.value))} />
                    <label htmlFor="statement">Statement:</label>
                    <textarea id="statement" name="statement" rows={4} required value={statement} onChange={(e) => setStatement(e.target.value)} />
                    <label>Options:</label>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} onKeyDown={(e) => handleKeyPress(e, index)} />
                        </div>
                    ))}
                    <label htmlFor="type">Type:</label>
                    <input type="number" id="type" name="type" min={1} max={4} value={type} onChange={(e) => setType(parseInt(e.target.value))} />
                    <button type="button" onClick={addOption}>Add Option</button>
                    <button type="submit">Create Question</button>
                </form>
            </div>
        </body>
    );
};

export default CreateAuction;
