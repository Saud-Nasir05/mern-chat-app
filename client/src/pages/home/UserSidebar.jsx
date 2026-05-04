// import React, { useEffect, useState } from 'react'; // 🟢 FIX 1: useState import kiya
// import User from './User';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOtherUserThunk, logoutUserThunk } from '../../slice/user/userThunk';

// const UserSidebar = () => {
//   const dispatch = useDispatch();
  
//   const { otherUsers, userProfile } = useSelector((state) => state.userSlice);
  
//   // 🟢 FIX 2: Search input ke liye state bana di
//   const [searchQuery, setSearchQuery] = useState("");
  
//   const handleLogout = async () => {
//     await dispatch(logoutUserThunk());
//   };

//   useEffect(() => {
//     dispatch(getOtherUserThunk());
//   }, [dispatch]);

//   // Profile Picture ka logic
//   const myProfilePic = userProfile?.avatar || `https://ui-avatars.com/api/?name=${userProfile?.username}&background=random`;

//   // 🟢 FIX 3: Asal Jadoo! Users ko filter karna
//   // Agar search khali hai toh saare users aayenge, warna sirf match hone wale aayenge
//   const filteredUsers = otherUsers?.filter((user) => {
//     return user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
//            user.username.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   return (
//     <div className="flex h-screen flex-col bg-base-200 border-r border-base-300 w-full md:w-80">
      
//       {/* Header */}
//       <div className="p-4 border-b border-base-300">
//         <h1 className="text-2xl font-bold text-primary tracking-wider text-center md:text-left">
//           BAKCHODS
//         </h1>
//       </div>

//       {/* Search Bar */}
//       <div className="px-4 py-3">
//         <label className="input input-bordered flex items-center gap-2 bg-base-100 rounded-full h-10">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16"
//             fill="currentColor"
//             className="w-4 h-4 opacity-70"
//           >
//             <path
//               fillRule="evenodd"
//               d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <input 
//             type="text" 
//             className="grow text-sm" 
//             placeholder="Search friends..." 
//             // 🟢 FIX 4: Input ko state ke sath bind kar diya
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </label>
//       </div>

//       {/* User List - Scrollable Area */}
//       <div className="flex-1 overflow-y-auto px-2 space-y-1 py-2 custom-scrollbar">
//         {/* 🟢 FIX 5: otherUsers ki jagah ab filteredUsers par map lagaya hai */}
//         {filteredUsers?.length > 0 ? (
//           filteredUsers.map((userDetails) => (
//             <User key={userDetails?._id} userDetails={userDetails} />
//           ))
//         ) : (
//           // Agar koi dost search mein nahi mila toh yeh text dikhega
//           <div className="text-center text-sm text-base-content/50 mt-4 font-medium">
//             No user found! 🕵️‍♂️
//           </div>
//         )}
//       </div>

//       {/* Footer / Current User Profile */}
//       <div className="p-4 bg-base-300 border-t border-base-100 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="avatar">
//             <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
//               <img src={myProfilePic} alt="my-avatar" />
//             </div>
//           </div>
//           <div className="hidden md:block">
//              <p className="text-sm font-bold uppercase">{userProfile?.username || "USER"}</p>
//           </div>
//         </div>

//         <button className="btn btn-sm btn-error btn-outline text-white hover:text-white" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserSidebar;



import React, { useEffect, useState } from 'react';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUserThunk, logoutUserThunk } from '../../slice/user/userThunk';

const UserSidebar = () => {
  const dispatch = useDispatch();
  
  const { otherUsers, userProfile, selectedUser } = useSelector((state) => state.userSlice);
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    dispatch(getOtherUserThunk());
  }, [dispatch]);

  const myProfilePic = userProfile?.avatar || `https://ui-avatars.com/api/?name=${userProfile?.username}&background=random`;

  const filteredUsers = otherUsers?.filter((user) => {
    return user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
           user.username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={`h-full flex-col bg-base-200 border-r border-base-300 w-full md:w-80 transition-all duration-300 ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
      
      <div className="p-4 border-b border-base-300">
        <h1 className="text-2xl font-bold text-primary tracking-wider text-center md:text-left">
          BAKCHODS
        </h1>
      </div>

      <div className="px-4 py-3">
        <label className="input input-bordered flex items-center gap-2 bg-base-100 rounded-full h-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input 
            type="text" 
            className="grow text-sm" 
            placeholder="Search friends..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1 py-2 custom-scrollbar">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((userDetails) => (
            <User key={userDetails?._id} userDetails={userDetails} />
          ))
        ) : (
          <div className="text-center text-sm text-base-content/50 mt-4 font-medium">
            No user found! 🕵️‍♂️
          </div>
        )}
      </div>

      {/* Footer / Current User Profile */}
      <div className="p-4 bg-base-300 border-t border-base-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img src={myProfilePic} alt="my-avatar" />
            </div>
          </div>
          {/* 🟢 FIX: 'hidden md:block' hata diya, aur 'truncate' lagaya taake design na toote */}
          <div>
             <p className="text-sm font-bold uppercase truncate max-w-[100px] sm:max-w-[150px]">
               {userProfile?.username || "USER"}
             </p>
          </div>
        </div>

        <button className="btn btn-sm btn-error btn-outline text-white hover:text-white" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;