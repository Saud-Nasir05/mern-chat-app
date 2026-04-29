import express from 'express'
import { getOtherUser, getProfile, login, logout, register } from '../controllers/userController.js';
import { isAuth } from '../middlewares/authMiddleware.js';
const router=express.Router();
router.post("/login",login)
router.post("/register",register)
router.get("/getProfile",isAuth,getProfile)
router.post("/logout",isAuth,logout)
router.get("/getotheruser",isAuth,getOtherUser)
export default router