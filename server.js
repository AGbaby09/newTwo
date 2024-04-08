import express from "express";
import cors from "cors";
import http from "http"; // Import the http module
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import { Server } from "socket.io";




// configuring dotenv
dotenv.config();
// connect to db
dbConnect();

const app = express();
const server = http.createServer(app); // Create an http server
const io = new Server(server, {
    cors:{
        origin: 'https://crmgh.vercel.app',
        methods: ["POST", "GET", "PUT", "DELETE"],
    },
}); // Pass the http server to Socket.io

app.use(cors());
app.use(express.json({limit: '25mb'}));

io.on("connection", (socket)=>{
    console.log(`${socket.id} connected`);
    // Handle events here
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    
    // events

    socket.on('login',async ()=>{
        
        socket.emit('loggedIn', {
            message: "User logged in succesfully",
        })
        
    })
    
})




// listening to port
const port = process.env.PORT;
server.listen(port, ()=>{console.log("server is running on port", port)})

export { io }