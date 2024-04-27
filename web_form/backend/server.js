import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import { connect } from "./utils/db.js";
import { Auction } from "./models/auction.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

config({
  path: "./config.env",
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);

  socket.on("place-bid", async (data) => {
    try {
      const { id, bidAmount, user_id } = data;
      const auction = await Auction.findById(id);
      if (!auction) {
        console.log("Auction does not exist");
        throw new Error("Auction does not exist");
      }

      auction.current_bid = bidAmount;
      auction.current_bidder = user_id;

      await auction.save();
      console.log("BID PLACED:", auction);

      io.emit('new-bid', { id, bidAmount});
      console.log("BID EMITTED:", auction);
    } catch (error) {
      console.error("ERROR:", error.message);
    }
  } );

  const handleAuctionEnd = async (id) => {                                      //ends an auction
    const auction = await Auction.findById(id);
    if (!auction) {
      console.log("Auction does not exist");
      throw new Error("Auction does not exist");
    }

    auction.owned_by = auction.current_bidder;

    await auction.save();
    console.log("AUCTION ENDED:", auction);

    io.emit('auction-ended', { id });
    console.log("AUCTION EMITTED:", auction);
  };

  const checkAuctionEnd = async (id) => {                                       //checks all auctions and initiates end if time is up
    const auctions = await Auction.find({end_time: {$lt: new Date()}});
    if (auctions.length > 0) {
        auctions.forEach(async (auction) => {
            await handleAuctionEnd(auction._id);
        });
    }
  }

  setInterval(() => {                                                           //checks every 59 seconds
    checkAuctionEnd();
  }
  , 59000);

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED:", socket.id);
  });
  
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

connect();

