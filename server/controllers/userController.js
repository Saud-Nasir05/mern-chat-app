import { response } from 'express'
import User from '../models/userModel.js'
import {asyncHandler} from '../utilities/asyncHandlerUtility.js'
import { errorHandler } from '../utilities/errorHandlerUtility.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
//register route 
export const register=asyncHandler(
    // chk if users has enterd all fields
    // chk if same user with same username already exsists
    //hash the password
    //manage the avatar
    // save the details sent by the user in db and hashed pass
    // convert the user id into token through jwt
    //set the cookie and send response (newUser,token)
   async (req,res,next)=>{
        const {fullName,username,password,gender}=req.body;
        if(!fullName || !username || !password || !gender){
            return next(new errorHandler("all fields are required",400))
        }
        const user=await User.findOne({username:username})
        if(user){
            return next(new errorHandler(`user already exists`,400))
        }
        const avatarType=gender==="male"? "adventurer":"lorelei"
        const avatar=`https://api.dicebear.com/7.x/${avatarType}/svg?seed=${username}`
        const hashedPass=await bcrypt.hash(password,10)
        const newUser=await User.create({
            username,
            fullName,
            password:hashedPass,
            gender,
            avatar
        })
        const tokenData={
            _id:newUser?._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
        res
        .status(200)
        .cookie("token",token,{
            expires:new Date(
                Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly:true,
            secure:true,
            sameSite:'None'
        },
    ).json({
            success:true,
            responseData:{
                newUser,
                token
            }
        })
}
)
//login route 
export const login=asyncHandler(
    //chk if users has entered all req fields
    //find the user with the help of username
    //chk if password is valid
    //convert the id into token
    //set the cookies
    //send response (user,token)
   async (req,res,next)=>{
        const {username,password}=req.body;
        if(!username || !password ){
            return next(new errorHandler("enter valid username or password",400))
        }
        const user=await User.findOne({username:username})
        if(!user){
            return next(new errorHandler("enter valid username or password",400))
        }

        const isValidPass=await bcrypt.compare(password,user.password)
        if(!isValidPass){
            return next(new errorHandler("please enter correct username or password"))
        }
        const tokenData={
            _id:user?._id
        }
        const token=jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE})
        res.status(200)
                .cookie("token",token,{
            expires:new Date(
                Date.now()+process.env.JWT_EXPIRES*24*60*60*1000
            ),
            httpOnly:true,
            secure:true,
            sameSite:'None'
        },
    ).json({
            success:true,
            responseData:{
                user,
                token
            }
        })
}
)
//get profile
export const getProfile = async (req, res,next) => {
    //auth middle ware jo id bhj raha us id kai through us user ko find kia or usko response mai bhj dia 
    try {
        const user = await User.findById(req.user._id);
        
        // YEH CONDITION LAZMI HONI CHAHIYE:
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, responseData: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
//logout route 
export const logout=asyncHandler(async(req,res,next)=>{
    //cookie clear kia 
    res.status(200).cookie("token","",{
        expires:new Date(
            Date.now()
        ),
        httpOnly:true
    }).json({
        success:true,
        message:"logout succesful"
    })
})
//get other user 
export const getOtherUser=asyncHandler(async(req,res,next)=>{
    //auth middle ware jo id bhj raha us id kai through us user ko find kia or uskai ilawa response mai bhj dia 
    const otherUser=await User.find({_id:{$ne : req.user._id}})
    res.status(200).json({
        success:true,
        responseData:otherUser
    })
})
