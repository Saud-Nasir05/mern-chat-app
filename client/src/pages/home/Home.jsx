import React, { useEffect } from 'react'
import UserSidebar from './UserSidebar'
import MessageContainer from './MessageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket, setOnlineUsers, closeSocket } from '../../slice/socket/socketSlice'
import { addMessage } from '../../slice/message/messageSlice' 

const Home = () => {
  const dispatch = useDispatch()
  
  // 🟢 selectedUser ko yahan nikal liya hai
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
        
        // 🟢 JADOO: Agar jiski chat khuli hai, message usi ne bheja hai, toh hi screen par dikhao!
        const isChatOpen = selectedUser?._id === newMessage.senderId;
        
        // Agar main us se baat kar raha hoon, ya usne mujhe reply kiya hai
        if (isChatOpen) {
            dispatch(addMessage(newMessage)); 
        }
    });

    return () => {
        socket.off("onlineUsers");
        socket.off("newMessage"); 
    }
  }, [socket, dispatch, selectedUser]) // 🟢 dependency mein selectedUser dalna lazmi hai

  return (
    <div className='flex'>
      <UserSidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home