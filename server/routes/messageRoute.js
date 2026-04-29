import express from 'express'
import { isAuth } from '../middlewares/authMiddleware.js'
import { getMessage, sendMessage } from '../controllers/messageController.js'
const router=express.Router()
router.post("/send/:recivierId",isAuth,sendMessage)
router.get("/getMessage/:otherParticipantId",isAuth,getMessage)
export default router