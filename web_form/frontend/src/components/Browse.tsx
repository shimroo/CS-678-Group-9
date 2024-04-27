import React from 'react';
import '../styles/browse.css'; // Import the CSS file for styling
import Navbar from './Navbar';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Auction {
    _id: string;
    title: string;
    description: string;
    starting_bid: number;
    current_bid: number;
    start_time: string;
    end_time: string;
}


const Browse: React.FC = () => {

    const { user } = useAuthContext();                                  //for user authentication
    const username = user?.username;                                     //for username
    const navigate = useNavigate();                                     //for navigation
    const [title, setQuery] = React.useState<string>('');               //for title
    const [auctions, setAuctions] = React.useState<Auction[]>([]);      //for storing auctions
    const [loading, setLoading] = React.useState<boolean>(true);        //for loading spinner
    const [repeat, setRepeat] = React.useState<boolean>(false);          //for repeat


    const fetchAuctions = async () => {
        try {
            const response = await axios.post('http://localhost:8000/auction/ongoing');         //fetch auctions
            setAuctions(response.data);                                                         //store auctions
            setLoading(false);                                                                  //stop loading spinner
        } catch (error) {
            console.error(error);
        }
    }

    const handleSearch = async (e: any) => {
        setRepeat(true);
        try {
            e.preventDefault();
            setLoading(true);                                                                   //start loading spinner
            const response = await axios.post('http://localhost:8000/auction/search', {title}); //fetch auctions
            setAuctions(response.data);                                                         //store auctions
            setLoading(false);                                                                  //stop loading spinner
        } catch (error) {
            console.error(error);
        }
    }

    const handleAuction = (id: string) => {
        navigate(`/auction/${id}`);
    }

    useEffect(() => {
        if (repeat) {
            setInterval(fetchAuctions, 10000);      //fetch auctions every 10 seconds
        } else {
            fetchAuctions();
        } 
    }
    , []);


    return (
        <body>
            <Navbar />
            <div className="browse_container">
                <div className="browse_search-container">
                    <input type="text" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                {loading ? (        
                    <p>Loading...</p>
                ) : auctions.length === 0 ? (
                    <p>No auctions found.</p>
                ) : (
                    auctions.map((auction) => (
                        <div className="browse_auction-card" onClick={() => handleAuction(auction._id)}>
                            <div className="browse_auction-details" key={auction._id}>
                                <h2 className="browse_auction-title">{auction.title}</h2>
                                <p className="browse_description">{auction.description}</p>
                                <p>Start Price: ${auction.starting_bid}</p>
                                <p>Current Price: ${auction.current_bid}</p>
                                <p>Start Time: {auction.start_time}</p>
                                <p>End Time: {auction.end_time}</p>
                            </div>
                        </div>
                    ))
                )} 
            </div>
        </body>
    );
};

export default Browse;
