import React from 'react';
import '../styles/specificauction.css'; // Import the CSS file for styling
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';


interface Auction {
    _id: string;
    title: string;
    description: string;
    starting_bid: number;
    current_bid: number;
    start_time: string;
    end_time: string;
    created_by: string;
}

const SpecificAuction: React.FC = () => {

    const { user } = useAuthContext();                                  //for user authentication
    const username = user?.username;                                     //for username
    const navigate = useNavigate();                                     //for navigation
    const [auction, setAuction] = React.useState<Auction>();           //for storing auction
    const [loading, setLoading] = React.useState<boolean>(true);        //for loading spinner
    const [bidAmount, setBidAmount] = React.useState<number>(0);       //for bid amount
    const [user_id, setUser_id] = React.useState<string>('');           //for user id
    const [socket, setSocket] = React.useState<any>();                  //for socket


    const getUser = async () => {
        try {
            const response = await axios.post('http://localhost:8000/user/profile', {username}); //fetch user
            setUser_id(response.data._id);                                              //store user id
        } catch (error) {
            console.error(error);
        }
    };

    const { id } = useParams();                                         //for auction id
    
    
    const fetchAuction = async () => {
        try {
            const response = await axios.post('http://localhost:8000/auction/page', {id}); //fetch auction
            setAuction(response.data);                                                  //store auction
            setLoading(false);                                                            //stop loading spinner
        } catch (error) {
            console.error(error);
        }
    };

    const placeBid = async () => {
        try {

            socket.emit('get_Ad', { prompt: 'Pyhthogorean Theorem' }); 

        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getUser();
        fetchAuction();

        const socket = io('http://localhost:8000');
        setSocket(socket);
;
        socket.on('new-bid', (data: any) => {
            
            const { id, bidAmount } = data;
            fetchAuction();
            console.log("recieved id " + id + " auction id " + auction?._id);
            if (id === auction?._id) {
                console.log('New bid for' + id + 'received' + bidAmount);
                fetchAuction();
            }

            console.log("recieved bid update 2" + id + bidAmount)
        });

        socket.on('auction-ended', (data: any) => {
            const { id } = data;
            if (id === auction?._id) {   
                alert('Auction has ended please browse from other auctions');
                navigate('/browse');
            }
        });


        return () => {
            socket.disconnect();
        };
    }
    , []);


    return (
        <body>
            <Navbar />
            <div className="auction-details">
                <div className="specific_auction-info">
                    <h2 className="auction-title">{auction?.title}</h2>
                    <p className="description">{auction?.description}</p>
                    <p><strong>Starting Price:</strong> {auction?.starting_bid}</p>
                    <p><strong>Current Price:</strong> {auction?.current_bid}</p>
                    <p><strong>Start Time:</strong> {auction?.start_time}</p>
                    <p><strong>End Time:</strong> {auction?.end_time}</p>
                    <div className="bid-form">
                        <label htmlFor="bidAmount">Your Bid:</label>
                        <input type="number" id="bidAmount" name="bidAmount" required onChange={(e) => setBidAmount(parseInt(e.target.value))} />
                        <button type="submit" onClick={placeBid}>Place Bid</button>

                    </div>
                </div>
            </div>
        </body> 
    );
};

export default SpecificAuction;
