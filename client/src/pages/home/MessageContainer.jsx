
import React, { useEffect, useState } from 'react';
import User from './User';
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk, sendMessageThunk } from '../../slice/message/messageThunk';
import { setSelectedUser } from '../../slice/user/userSlice'; 

const MessageContainer = () => {
  const { selectedUser } = useSelector((state) => state.userSlice);
  const { messages } = useSelector((state) => state.messageSlice);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = (e) => {
    e.preventDefault(); 
    if (!message.trim()) return; 

    dispatch(sendMessageThunk({ 
        recieverId: selectedUser._id, 
        message: message 
    }));

    setMessage(""); 
  }

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ recieverId: selectedUser._id }));
    }
  }, [selectedUser, dispatch]);

  if (!selectedUser) {
    return (
      // 🟢 FIX: h-screen ki jagah h-full lagaya
      <div className='hidden md:flex w-full h-full justify-center items-center bg-base-100'>
        <div className='text-center space-y-4'>
          <div className='text-5xl'>👋</div>
          <h2 className='text-2xl font-bold text-base-content/70'>Welcome to Chat!</h2>
          <p className='text-base-content/50'>Please select a user from the sidebar to start messaging.</p>
        </div>
      </div>
    );
  }

  return (
    // 🟢 FIX: h-screen ki jagah h-full lagaya
    <div className='w-full h-full flex flex-col bg-base-100'>
      
      <div className='px-4 py-3 bg-base-100 border-b border-base-300 flex items-center gap-2 sticky top-0 z-10'>
        <button 
          className="md:hidden btn btn-ghost btn-circle btn-sm mr-1"
          onClick={() => dispatch(setSelectedUser(null))} 
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>

        <div className='flex-1 pointer-events-none'>
            <User userDetails={selectedUser} />
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4 bg-base-100 scroll-smooth'>
        {messages?.map((msg) => {
          return (
            <Message 
              key={msg._id} 
              messageDetails={msg} 
            />
          );
        })}
      </div>

      <div className='w-full p-4 bg-base-100/95 backdrop-blur-sm border-t border-base-300'>
        <form className="flex items-center gap-3 max-w-4xl mx-auto" onSubmit={handleSendMessage}>
          
          <input 
            type="text" 
            className="flex-1 input input-bordered input-primary w-full rounded-full px-5 bg-base-200 text-base-content focus:outline-none" 
            placeholder="Type a message..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          />
          
          <button type="submit" className="btn btn-circle btn-primary text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-0.5">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>

        </form>
      </div>

    </div>
  );
}

export default MessageContainer;