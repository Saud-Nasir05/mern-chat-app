import { createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client';

export const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: null,
        onlineUsers: null
    },
    reducers: {
        initializeSocket: (state, action) => { 
            // 🟢 FIX: Yahan fallback URL daala hai taake localhost pe bhi chale
            const backendURL = import.meta.env.VITE_DB_ORIGIN || "http://localhost:5000";
            
            const socket = io(backendURL, {
                query: {
                    userId: action.payload 
                }
            });
            state.socket = socket; 
        },
        
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },

        closeSocket: (state) => {
            if (state.socket) {
                state.socket.close();
            }
            state.socket = null;
            state.onlineUsers = null;
        }
    },
});

export const { initializeSocket, setOnlineUsers, closeSocket } = socketSlice.actions;
export default socketSlice.reducer;
