import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import { connect } from "./utils/db.js";
import { Ad } from "./models/Ad.js";

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



  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED:", socket.id);
  });

  // Event listener for receiving ad requests
  socket.on('get_Ad', (data) => {
    console.log('Received request to get Ad, sending response...');

    const pythonProcess = spawn('python3', ['gpt_script.py', JSON.stringify(data)]);

    pythonProcess.stdout.on('data', (output) => {
      const outputData = output.toString().trim();
      console.log('sending output to client');
      io.emit('seleniumOutput', outputData);

      // Save output to database
      const newOutput = new Output({ output: outputData });
      newOutput.save()
        .then(() => console.log('Output saved to database'))
        .catch((err) => console.error('Error saving output:', err));
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  });
  
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

connect();

