import { createAsyncThunk  } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../components/axiosinstance";

export const loginUserThunk=createAsyncThunk("user/login",async({username,password},{ rejectWithValue })=>{
    try {
        const response=await axiosInstance.post('/user/login',{
            username,
            password
        })
        toast.success("login successfull")
        return response.data
    } catch (error) {
        const errorOutput=error?.response?.data?.errMessage || error?.response?.data?.message || "Login failed";
        toast.error(errorOutput)
       return rejectWithValue(errorOutput);
    }
})

export const registerUserThunk=createAsyncThunk("user/register",async({username,password,fullName,gender},{ rejectWithValue })=>{
    try {
        const response=await axiosInstance.post('/user/register',{
            fullName,
            username,
            password,
            gender
        })
        toast.success("register successfull")
        return response.data
    } catch (error) {
        const errorOutput=error?.response?.data?.errMessage || error?.response?.data?.message || "registeration failed";
        toast.error(errorOutput)
       return rejectWithValue(errorOutput);
    }
})

export const logoutUserThunk=createAsyncThunk("user/logout",async(_,{ rejectWithValue })=>{
    try {
        const response=await axiosInstance.post('/user/logout')
        toast.success("logout successfull")
        return response.data
    } catch (error) {
        const errorOutput=error?.response?.data?.errMessage || error?.response?.data?.message || "Login failed";
        toast.error(errorOutput)
       return rejectWithValue(errorOutput);
    }
})

export const getUserProfileThunk=createAsyncThunk("user/getProfile",
    async(_,{rejectWithValue})=>{
        try {
            const response=await axiosInstance.get("/user/getProfile")
            return response.data
        } catch (error) {
            const errorOutput=error?.response?.data?.errMessage || error?.response?.data?.message || "Login failed";
            return rejectWithValue(errorOutput)
        }
    }
)

export const getOtherUserThunk=createAsyncThunk(
    "user/getotheruser",
    async(_,{rejectWithValue})=>{
        try {
            const response=await axiosInstance.get("/user/getotheruser")
            return response.data
        } catch (error) {
            const errorOutput=error?.response?.data?.errMessage || error?.response?.data?.message || "Login failed";
            return rejectWithValue(errorOutput)
        }
    }
)