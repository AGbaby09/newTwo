import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import { Server } from "socket.io";

// Configuring dotenv
dotenv.config();

// Connect to the database
dbConnect();

const app = express();

// Set up CORS middleware
app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests from this origin
  origin: 'https://crmgh.vercel.app', // Allow requests from this origin
  methods: ["POST", "GET", "PUT", "DELETE"], // Allow these HTTP methods
  credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"]
}));

// Set up JSON parsing middleware
app.use(express.json({ limit: '525mb' }));

// Create an HTTP server
const server = http.createServer(app);

// Create a Socket.IO server and pass the HTTP server
const io = new Server(server, {
    cors:{
        // origin: 'http://localhost:5173', // Allow requests from this origin
        origin: 'https://crmgh.vercel.app', // Allow requests from this origin
        methods: ["POST", "GET", "PUT", "DELETE"], // Allow these HTTP methods
        credentials: true,
          optionsSuccessStatus: 200,
          preflightContinue: false,
          allowedHeaders: ["Content-Type", "Authorization"],
          exposedHeaders: ["Authorization"]
      }
});

// Socket.IO connection event
io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    // Handle events here
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    
    // Handle login event
    socket.on('login', async () => {
        socket.emit('loggedIn', {
            message: "User logged in successfully",
        });
    });
});

// Listening to port
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server is running on port", port);
});

export { io };
