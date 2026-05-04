

import React from 'react'
import { useSelector } from 'react-redux'

const Message = ({messageDetails}) => {
  const { userProfile, selectedUser } = useSelector((state) => state.userSlice)
  
  const isMe = userProfile?._id === messageDetails?.senderId;

  const profilePic = isMe 
    ? userProfile?.avatar || `https://ui-avatars.com/api/?name=${userProfile?.fullName}` 
    : selectedUser?.avatar || `https://ui-avatars.com/api/?name=${selectedUser?.fullName}`;
    
  const senderName = isMe ? "You" : selectedUser?.fullName;

  const formattedTime = messageDetails?.createdAt 
    ? new Date(messageDetails.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "";

  return (
    <div className={`chat ${isMe ? 'chat-end' : 'chat-start'} mb-4`}>
      
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User Avatar" src={profilePic} />
        </div>
      </div>
      
      <div className="chat-header text-base-content/70 pb-1">
        {senderName}
        <time className="text-xs opacity-50 ml-1">{formattedTime}</time>
      </div>
      
      <div className={`chat-bubble ${isMe ? 'chat-bubble-primary text-white' : 'bg-base-300 text-base-content'}`}>
        {messageDetails.message}
      </div>
      
    </div>
  )
}

export default Message