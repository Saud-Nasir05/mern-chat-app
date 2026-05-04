// import React from 'react'
// import { useSelector } from 'react-redux'

// const Message = ({messageDetails}) => {
//   // Redux se dono (Apna aur samnay walay ka) data nikal liya
//   const { userProfile, selectedUser } = useSelector((state) => state.userSlice)
  
//   // Check kiya ke message maine bheja hai (true) ya samnay walay ne (false)
//   const isMe = userProfile?._id === messageDetails?.senderId;

//   // Agar isMe true hai toh meri pic aur naam chalega, warna samnay walay ka
//   const profilePic = isMe 
//     ? userProfile?.avatar || `https://ui-avatars.com/api/?name=${userProfile?.fullName}` 
//     : selectedUser?.avatar || `https://ui-avatars.com/api/?name=${selectedUser?.fullName}`;
    
//   const senderName = isMe ? "You" : selectedUser?.fullName;

//   // Time nikalne ka tareeqa (agar backend createdAt bhej raha hai)
//   const formattedTime = messageDetails?.createdAt 
//     ? new Date(messageDetails.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     : "";

//   return (
//     // FIX 1: isMe ki base par 'chat-end' (Right) ya 'chat-start' (Left) set kiya
//     <div className={`chat ${isMe ? 'chat-end' : 'chat-start'} mb-4`}>
      
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           {/* Asli profile picture */}
//           <img alt="User Avatar" src={profilePic} />
//         </div>
//       </div>
      
//       <div className="chat-header text-base-content/70 pb-1">
//         {/* Asli naam aur time */}
//         {senderName}
//         <time className="text-xs opacity-50 ml-1">{formattedTime}</time>
//       </div>
      
//       {/* FIX 2: Agar apna message hai toh primary color, samnay walay ka hai toh gray color */}
//       <div className={`chat-bubble ${isMe ? 'chat-bubble-primary text-white' : 'bg-base-300 text-base-content'}`}>
//         {messageDetails.message}
//       </div>
      
//     </div>
//   )
// }

// export default Message









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