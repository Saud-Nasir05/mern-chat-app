
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser';
import {connectDb} from './db/connextionDb.js'
import {app,server} from './socket/socket.js'

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://mern-chat-app-three-mu.vercel.app' // 🟢 Screenshot wala actual naya link!
    ],
    credentials: true
}))
connectDb()
import userRoute from './routes/userRoutes.js'
import messageRoute from './routes/messageRoute.js'
app.use('/api/v1/user',userRoute)
app.use('/api/v1/message',messageRoute)
import { errorMiddleware } from './middlewares/errorMiddleware.js'
app.use(errorMiddleware)
server.listen(3000,()=>{
    console.log("app is running")
})