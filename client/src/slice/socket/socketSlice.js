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
            const socket = io(import.meta.env.VITE_DB_ORIGIN, {
                query: {
                    userId: action.payload 
                }
            });
            state.socket = socket; 
        },
        
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },

        // 🟢 NAYA JADOO: Logout hone par pipe yahan se tootega
        closeSocket: (state) => {
            if (state.socket) {
                state.socket.close();
            }
            state.socket = null;
            state.onlineUsers = null;
        }
    },
});

// Yahan neeche closeSocket ko export karna mat bhoolna
export const { initializeSocket, setOnlineUsers, closeSocket } = socketSlice.actions;
export default socketSlice.reducer;