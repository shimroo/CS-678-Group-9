import React, { useEffect } from 'react';
import '../styles/profile.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuth';

interface Created {
    _id: string;
    title: string;
    description: string;
    starting_bid: number;
    current_bid: number;
    start_time: string;
    end_time: string;
}

interface Owned {
    _id: string;
    title: string;
    description: string;
    starting_bid: number;
    current_bid: number;
    start_time: string;
    end_time: string;
}

const Profile: React.FC = () => {

    const { user } = useAuthContext();                                  //for user authentication
    const username = user?.username;                                     //for username
    const navigate = useNavigate();                                     //for navigation
    const [created, setCreated] = React.useState<Created[]>([]);        //for storing created
    const [owned, setOwned] = React.useState<Owned[]>([]);                         
    const [loading, setLoading] = React.useState<boolean>(true);        //for loading spinner
    const [name, setName] = React.useState<string>('');                 //for name

    const createAuction = () => {navigate('/create');}
    const updatePassword = () => {navigate('/password');}

    //function to 
    const fetchCreated = async () => {
        try {
            const response = await axios.post('http://localhost:8000/user/list/created', {username} ); //fetch created
            setCreated(response.data);                                                         //store created
            setLoading(false);                                                                  //stop loading spinner
        } catch (error) {
            console.error(error);
        }
    }

    const fetchListing = async () => {
        try{
            const response = await axios.post('http://localhost:8000/user/list/current',{username});
            setOwned(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error)
        }
    }

    const fetchName = async () => {
        try{
            const response = await axios.post('http://localhost:8000/user/name',{username});
            setName(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchCreated();
        fetchListing();
        fetchName();
    }, []);

    return (
        <body>
            <Navbar />
            <div className="profile_container">
                <div className="profile_profile-info">
                    <div className="profile_user-details">
                        <h2>Name: {name}</h2>
                        <p>Username: {username}</p>
                    </div>
                </div>
                <div className="profile-actions">
                    <button className="custom-button" onClick={createAuction}>Create Auction</button>
                    <button className="custom-button" onClick={updatePassword}>Update Password</button>
                </div>
                <h3>Auctions created by you</h3>
                <div className="profile_auction-list"> 
                    {loading ? (        
                        <p>Loading...</p>
                    ) : created.length === 0 ? (
                        <p>No created found.</p>
                    ) : (
                        created.map((auction) => (
                            <div className="profile_auction-card" key={auction._id}>
                                <h4>{auction.title}</h4>
                                <p>{auction.description}</p>
                                <p>Start Price: ${auction.starting_bid}</p>
                                <p>Current Price: ${auction.current_bid}</p>
                                <p>Start Time: {auction.start_time}</p>
                                <p>End Time: {auction.end_time}</p>
                            </div>
                        ))
                    )} 
                </div>
                <h3>Auctions owned by you</h3>
                <div className="profile_auction-list"> 
                    {loading ? (        
                        <p>Loading...</p>
                    ) : owned.length === 0 ? (
                        <p>No owned found.</p>
                    ) : (
                        owned.map((auction) => (
                            <div className="profile_auction-card" key={auction._id}>
                                <h4>{auction.title}</h4>
                                <p>{auction.description}</p>
                                <p>Start Price: ${auction.starting_bid}</p>
                                <p>Current Price: ${auction.current_bid}</p>
                                <p>Start Time: {auction.start_time}</p>
                                <p>End Time: {auction.end_time}</p>
                            </div>
                        ))
                    )} 
                </div>
            </div>
        </body>
    );
};

export default Profile;
