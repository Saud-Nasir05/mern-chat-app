
import React, { useEffect } from 'react'
import UserSidebar from './UserSidebar'
import MessageContainer from './MessageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket, setOnlineUsers, closeSocket } from '../../slice/socket/socketSlice'
import { addMessage } from '../../slice/message/messageSlice' 

const Home = () => {
  const dispatch = useDispatch()
  
  const { isAuthenticated, userProfile, selectedUser } = useSelector(state => state.userSlice) 
  const { socket } = useSelector(state => state.socketSlice)

  useEffect(() => {
    if(isAuthenticated && userProfile) {
        dispatch(initializeSocket(userProfile._id)); 
    } 
    else if (!isAuthenticated) {
        dispatch(closeSocket());
    }
  }, [isAuthenticated, userProfile, dispatch]) 

  useEffect(() => {
    if(!socket) return;
    
    socket.on("onlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
    });

    socket.on("newMessage", (newMessage) => {
        console.log("Real-time message received:", newMessage);
        
        const isChatOpen = selectedUser?._id === newMessage.senderId;
        
        if (isChatOpen) {
            dispatch(addMessage(newMessage)); 
        }
    });

    return () => {
        socket.off("onlineUsers");
        socket.off("newMessage"); 
    }
  }, [socket, dispatch, selectedUser])

  return (
    // 🟢 FIX: h-screen ki jagah h-[100dvh] lagaya
    <div className='flex h-[100dvh] overflow-hidden bg-base-100'>
      <UserSidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home