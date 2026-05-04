import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import http from "http"
import {Server} from "socket.io"

const app = express();
const server = http.createServer(app)

// 🟢 FIX: Yahan Vercel ka naya link daal diya hai array ke andar
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:5173',
            'https://mern-chat-app-three-mu.vercel.app' // Tumhara naya Vercel Domain!
        ],
        methods: ["GET", "POST"], // Yeh laazmi add karo taake requests block na hon
        credentials: true
    }
})

const userSocketMap = {}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(userId)
    
    if(!userId) return
    
    userSocketMap[userId] = socket.id
    io.emit("onlineUsers", Object.keys(userSocketMap))
    
    socket.on("disconnect", () => {
        delete userSocketMap[userId]
        io.emit("onlineUsers", Object.keys(userSocketMap))
    })
})

const getSocketId = (userId) => {
    return userSocketMap[userId]
}

export { io, app, server, getSocketId }