import React from 'react';
import '../styles/createauction.css'; // Import the CSS file for styling
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuth';
import axios from 'axios';


const CreateAuction: React.FC = () => {

    const navigate = useNavigate();
    const { user } = useAuthContext();
    const username = user?.username;
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [starting_bid, setStartingPrice] = React.useState<number>(0);
    const [end_time, setEndTime] = React.useState<string>('');

    const createAuction = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/user/create', { username, title, description, starting_bid, end_time });
            console.log(response.data);
            alert('Auction created successfully!');
            navigate('/profile');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <body>
            <Navbar />
            <div className="container">
                <h1>Create Auction</h1>
                <form action="" onSubmit={createAuction}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" rows={4} required onChange={(e) => setDescription(e.target.value)} />
                    <label htmlFor="startingPrice">Starting Price:</label>
                    <input type="number" id="startingPrice" name="startingPrice" min={0} step={1} required onChange={(e) => setStartingPrice(parseInt(e.target.value))} />
                    <label htmlFor="endTime">End Time:</label>
                    <input type="datetime-local" id="endTime" name="endTime" required onChange={(e) => setEndTime(e.target.value)} />
                    <button type="submit">Create Auction</button>
                </form>
            </div>
        </body>
    );
};

export default CreateAuction;
