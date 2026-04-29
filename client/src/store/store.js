  import { configureStore } from '@reduxjs/toolkit';
  import userSlice from '../slice/user/userSlice';
  import messageSlice from '../slice/message/messageSlice';
  import socketSlice from '../slice/socket/socketSlice'; // 👈 BINA brackets ke import kiya

  export const store = configureStore({
    reducer: {
      userSlice,
      messageSlice,
      socketSlice
    },
    middleware: (getDefaultMiddleware) => {
      // 👈 YAHAN 'return' LAZMI HAI
      return getDefaultMiddleware({
        serializableCheck: false
      });
    }
  });