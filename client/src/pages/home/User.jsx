import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../slice/user/userSlice';

const User = ({userDetails}) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userSlice);
  
  // Socket se online users nikale
  const {onlineUsers} = useSelector(state => state.socketSlice);
  
  // Check kiya ke yeh wala user online list mein hai ya nahi
  const isUserOnline = onlineUsers?.includes(userDetails?._id);
  
  // Check kiya ke kya yeh selected user hai?
  const isSelected = selectedUser?._id === userDetails?._id;

  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  }
                                                                                                    
  const fallbackAvatar = userDetails?.gender === 'female' 
    ? `https://api.dicebear.com/7.x/lorelei/svg?seed=${userDetails?.username || 'female'}` 
    : `https://api.dicebear.com/7.x/adventurer/svg?seed=${userDetails?.username || 'male'}`;

  return (
    <div 
      onClick={handleUserClick} 
      className={`flex gap-3 items-center hover:bg-base-300 rounded-lg p-2 cursor-pointer transition-all duration-200 ${isSelected ? 'bg-black' : ''}`}
    >
      
      {/* 🟢 YAHAN SE CHANGE HAI: Humne ek 'relative' div banaya */}
      <div className="relative">
        
        <div className="avatar">
          {/* Tumhara original blue border waisa hi rahay ga */}
          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img 
              src={userDetails?.avatar || fallbackAvatar} 
              alt={`${userDetails?.username || 'user'} avatar`} 
            />
          </div>
        </div>

        {/* 🟢 THE CUSTOM GREEN DOT: Yeh hamesha upar (z-10) aur corner par rahega */}
        {isUserOnline && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-base-100 rounded-full z-10"></span>
        )}

      </div>

      <div className='flex flex-col flex-1'>
        <div className='flex justify-between items-center'>
          <h3 className='font-semibold text-base-content line-clamp-1'>{userDetails?.fullName}</h3>
        </div>
        <p className='text-xs text-base-content/60'>{userDetails?.username}</p>
      </div>
    </div>
  )
}

export default User;