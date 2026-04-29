/*import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./messageThunk";

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        buttonLoading: false,
        // FIX 1: null ki jagah khali array [] rakhna zaroori hai
        messages: [] 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // --- send message ---
            .addCase(sendMessageThunk.pending, (state) => {
                state.buttonLoading = true;
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.buttonLoading = false;
                
                // FIX 2: Backend ke response se asal naya message nikala
                const newMessage = action.payload?.responseData?.newMessage;
                
                if (newMessage) {
                    // Redux Toolkit (Immer) ki wajah se hum array mein direct naya message push kar saktay hain
                    state.messages.push(newMessage); 
                }
            })
            .addCase(sendMessageThunk.rejected, (state) => {
                state.buttonLoading = false;
            })
            
            // --- get message ---
            .addCase(getMessageThunk.pending, (state) => {
                state.buttonLoading = true;
                state.messages = [];
            })
            .addCase(getMessageThunk.fulfilled, (state, action) => {
                console.log("Get Messages Response:", action.payload);
                state.buttonLoading = false;
                
                // FIX 3: Agar backend undefined de toh error bachane ke liye || [] laga diya
                // Note: Agar aapke backend se messages direct responseData mein aatay hain toh isko:
                // state.messages = action.payload?.responseData || [] kijiye ga.
                state.messages = action.payload?.responseData?.messages || action.payload?.responseData || [];
            })
            .addCase(getMessageThunk.rejected, (state) => {
                state.buttonLoading = false;
            });            
    }
});

export default messageSlice.reducer;*/
import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./messageThunk";

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        buttonLoading: false,
        messages: [] 
    },
    reducers: {
        // 🟢 NAYA REDUCER: Real-time message ko list mein daalne ke liye
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageThunk.pending, (state) => {
                state.buttonLoading = true;
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.buttonLoading = false;
                const newMessage = action.payload?.responseData?.newMessage;
                if (newMessage) {
                    state.messages.push(newMessage); 
                }
            })
            .addCase(sendMessageThunk.rejected, (state) => {
                state.buttonLoading = false;
            })
            .addCase(getMessageThunk.pending, (state) => {
                state.buttonLoading = true;
                state.messages = [];
            })
            .addCase(getMessageThunk.fulfilled, (state, action) => {
                state.buttonLoading = false;
                state.messages = action.payload?.responseData?.messages || action.payload?.responseData || [];
            })
            .addCase(getMessageThunk.rejected, (state) => {
                state.buttonLoading = false;
            });            
    }
});

// 🟢 'addMessage' ko export karna mat bhoolna
export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;