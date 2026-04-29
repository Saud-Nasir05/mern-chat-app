import {asyncHandler} from '../utilities/asyncHandlerUtility.js'
 import { errorHandler } from '../utilities/errorHandlerUtility.js'
 import Message from '../models/messageModel.js'
 import Conversation from '../models/conversationModel.js'
import { response } from 'express'
import {getSocketId, io} from '../socket/socket.js'
// fetch sender id , recivier id , message and validate
// if convo bw these to doesnot exisits create convo
// create messqge
// push the msg into convo
export const sendMessage=asyncHandler(async (req,res,next)=>{
    const senderId=req.user._id;
    const recivierId=req.params.recivierId;
    const { message } = req.body
    if(!senderId || !recivierId || !message){
        return next(new errorHandler("all fields required",400))
    }
    let conversation=await Conversation.findOne({
        participants:{$all:[senderId,recivierId]}
    })
    if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,recivierId]
        })
    }
    const newMessage=await Message.create({
        senderId,
        recivierId,
        message
    })
    if(newMessage){
        conversation.messages.push(newMessage._id)
        await conversation.save()
    }
            //socket
const socketId = getSocketId(recivierId)
        if (socketId) {  // 👈 Yeh line server ko crash hone se bachayegi
            io.to(socketId).emit("newMessage", newMessage)
        }
    res.status(200).json({
        success:true,
        responseData:{
            newMessage
        }
    })
})
//fetch sender id , reciever id 
//find the conversation bw them and display the messages
export const getMessage = async (req, res) => {
    try {
        const { otherParticipantId } = req.params;
        const senderId = req.user._id; // Ya jo bhi aapke auth middleware se id aa rahi hai

        // Database se conversation dhoond rahe hain
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, otherParticipantId] }
        }).populate("messages");

        // 👉 YEH HAI WOH JADOO WALI LINE JO ADD KARNI HAI:
        // Agar pehli dafa chat ho rahi hai aur conversation DB mein nahi mili,
        // toh error dene ke bajaye 'khali array []' bhej do.
        if (!conversation) {
            return res.status(200).json({
                success: true,
                responseData: [] // Frontend ko khali list bhej di
            });
        }

        res.status(200).json({
            success: true,
            responseData: conversation.messages
        });

    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
//
