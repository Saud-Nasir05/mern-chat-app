import { asyncHandler } from "../utilities/asyncHandlerUtility.js"
import { errorHandler } from "../utilities/errorHandlerUtility.js"
import jwt from 'jsonwebtoken'
export const isAuth=asyncHandler(
   async (req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return next(new errorHandler("invalid token"),400)
    }
    const tokenData=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = tokenData;
    console.log(`token : ${token}`)
    console.log(`token data : ${tokenData}`)
    next()
   }
   
)