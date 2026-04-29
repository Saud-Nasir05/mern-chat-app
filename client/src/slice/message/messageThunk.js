import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../components/axiosinstance";

export const sendMessageThunk = createAsyncThunk("message/send", async ({ recieverId, message }, { rejectWithValue }) => {
    try {
        // FIX 1: URL theek kiya aur slash (/) lagaya. (Agar aapka backend route thora different hai toh isay update kar lijiye ga)
        const response = await axiosInstance.post(`/message/send/${recieverId}`, {
            message,
        });
        return response.data;
    } catch (error) {
        // FIX: Error message update kar diya
        const errorOutput = error?.response?.data?.errMessage || error?.response?.data?.message || "Message send failed";
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

export const getMessageThunk = createAsyncThunk("message/get", async ({ recieverId }, { rejectWithValue }) => {
    try {
        // FIX 2: getMessage ke baad slash (/) laga diya takay 404 error na aaye
        const response = await axiosInstance.get(`/message/getMessage/${recieverId}`);
        return response.data;
    } catch (error) {
        // FIX: Error message update kar diya
        const errorOutput = error?.response?.data?.errMessage || error?.response?.data?.message || "Failed to load messages";
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});