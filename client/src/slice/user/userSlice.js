import { createSlice } from "@reduxjs/toolkit";
import { getOtherUserThunk, getUserProfileThunk, loginUserThunk, logoutUserThunk, registerUserThunk } from "./userThunk";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        userProfile: null,
        buttonLoading: false,
        screenLoading: true,
        otherUsers: null,
        selectedUser:JSON.parse(localStorage.getItem("selectedUser"))
    },
    reducers: {
        setSelectedUser:(state,action)=>{
                state.selectedUser=action.payload
                localStorage.setItem("selectedUser",JSON.stringify(action.payload))
        }
    },
    extraReducers: (builder) => {
        builder
            // --- LOGIN ---
            .addCase(loginUserThunk.pending, (state) => {
                console.log("login pending");
                state.buttonLoading = true;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                console.log("login fulfilled");
                state.buttonLoading = false;
                state.userProfile = action.payload?.responseData?.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUserThunk.rejected, (state) => {
                console.log("login rejected");
                state.buttonLoading = false;
            })

            // --- REGISTER ---
            .addCase(registerUserThunk.pending, (state) => {
                console.log("register pending");
                state.buttonLoading = true;
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                console.log("register fulfilled");
                state.buttonLoading = false;
                state.userProfile = action.payload?.responseData?.newUser; 
                state.isAuthenticated = true;
            })
            .addCase(registerUserThunk.rejected, (state) => {
                console.log("register rejected");
                state.buttonLoading = false;
            })

            // --- LOGOUT ---
            .addCase(logoutUserThunk.pending, (state) => {
                console.log("logout pending");
                state.buttonLoading = true;
            })
            .addCase(logoutUserThunk.fulfilled, (state) => {
                console.log("logout fulfilled");
                state.buttonLoading = false;
                state.userProfile = null;
                state.isAuthenticated = false;
                state.userProfile=null
                state.otherUsers=null
                state.selectedUser=null
                localStorage.clear()
            })
            .addCase(logoutUserThunk.rejected, (state) => {
                console.log("logout rejected");
                state.buttonLoading = false;
            })

            // --- GET PROFILE ---
            .addCase(getUserProfileThunk.pending, (state) => {
                console.log("profile pending");
                state.screenLoading = true;
            })
            .addCase(getUserProfileThunk.fulfilled, (state, action) => {
                console.log("profile fulfilled");
                state.screenLoading = false;
                state.isAuthenticated = true;
                state.userProfile = action.payload?.responseData; 
            })
.addCase(getUserProfileThunk.rejected, (state) => {
                console.log("profile rejected - Forcing Logout");
                state.screenLoading = false;
                
                // YEH LINES ADD KAREIN: Agar token expire ho ya DB mein user na mile, toh foran logout treat karo
                state.isAuthenticated = false;
                state.userProfile = null;
                state.otherUsers = null;
                state.selectedUser = null;
                localStorage.removeItem("selectedUser"); // Purana selected user clear kar do
            })

            // --- GET OTHER USER ---
            .addCase(getOtherUserThunk.pending, (state) => {
                console.log("other users pending");
                state.screenLoading = true;
            })
            .addCase(getOtherUserThunk.fulfilled, (state, action) => {
                console.log("other users fulfilled");
                state.screenLoading = false;
                state.otherUsers = action.payload?.responseData;
            })
            .addCase(getOtherUserThunk.rejected, (state) => {
                console.log("other users rejected");
                state.screenLoading = false;
            });
    }
});

export const { login,setSelectedUser } = userSlice.actions;
export default userSlice.reducer;