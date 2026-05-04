// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { registerUserThunk } from '../../slice/user/userThunk'
// import toast from 'react-hot-toast'

// const Signup = () => {
//     const dispatch = useDispatch()
//     const navigate=useNavigate();
//     const {isAuthenticated} = useSelector((state) => state.userSlice)
//     useEffect(()=>{
//         if(isAuthenticated){
//             navigate("/")
//         }
//     },[isAuthenticated])
//     const [signupData, setSignupData] = useState({
//         fullName: "",
//         username: "",
//         password: "",
//         confirmPassword: "", 
//         gender: "" 
//     })

//     const handleChange = (e) => {
//         setSignupData({
//             ...signupData,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleSignup = async () => {
//        if(signupData.password !== signupData.confirmPassword){
//         return toast.error("password does not match")
//        }
//         const response = await dispatch(registerUserThunk(signupData))
//         if(response?.payload?.success){
//             navigate("/")
//         }
//     }

//     return (
//         <div className='flex min-h-screen w-full justify-center items-center'>

//             {/* Main Box */}
//             <div className='flex justify-center items-center p-6 bg-gray-600 flex-col w-[22rem] h-auto rounded-md shadow-lg gap-4'>

//                 <p className='text-xl w-full text-center text-white font-bold mb-2'>Please Signup</p>

//                 {/* Fullname */}
//                 <div className='w-full'>
//                     <label className="input validator w-full">
//                         <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
//                         <input onChange={handleChange} name='fullName' type="text" required placeholder="Full name" pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30" title="Only letters, numbers or dash" />
//                     </label>
//                 </div>

//                 {/* Username */}
//                 <div className='w-full'>
//                     <label className="input validator w-full">
//                         <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
//                         <input name='username' type="text" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30" title="Only letters, numbers or dash" onChange={handleChange} />
//                     </label>
//                 </div>

//                 {/* Password */}
//                 <div className='w-full'>
//                     <label className="input validator w-full">
//                         <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
//                         <input name='password' type="password" required placeholder="Password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" onChange={handleChange} />
//                     </label>
//                 </div>

//                 {/* Confirm Password */}
//                 <div className='w-full'>
//                     <label className="input validator w-full">
//                         <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
//                         <input name='confirmPassword' type="password" required placeholder="Confirm Password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" onChange={handleChange} />
//                     </label>
//                 </div>

// {/* gender */}
// <div className='w-full flex justify-around bg-gray-800 p-2 rounded-md'>

//     {/* Male */}
//     <div className="flex items-center gap-2">
//         <input
//             type="radio"
//             id="male"
//             name="gender"
//             value="male"
//             onChange={handleChange}
//             checked={signupData.gender === "male"}
//             className="w-4 h-4 accent-blue-500 cursor-pointer"
//         />
//         <label htmlFor="male" className="text-white cursor-pointer">
//             Male
//         </label>
//     </div>

//     {/* Female */}
//     <div className="flex items-center gap-2">
//         <input
//             type="radio"
//             id="female"
//             name="gender"
//             value="female"
//             onChange={handleChange}
//             checked={signupData.gender === "female"}
//             className="w-4 h-4 accent-blue-500 cursor-pointer"
//         />
//         <label htmlFor="female" className="text-white cursor-pointer">
//             Female
//         </label>
//     </div>

// </div>
//                  {/* signup button */}
//                 <button onClick={handleSignup} className="btn btn-neutral w-full bg-gray-800 border-none text-white hover:bg-gray-900 mt-2">
//                     Signup
//                 </button>

//                 <div className='text-sm text-white text-center'>
//                     <p>Already have an account? <Link to="/Login" className="text-blue-300 hover:underline">Login</Link></p>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Signup




import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../../slice/user/userThunk'
import toast from 'react-hot-toast'

const Signup = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate();
    const {isAuthenticated} = useSelector((state) => state.userSlice)
    
    useEffect(()=>{
        if(isAuthenticated){
            navigate("/")
        }
    },[isAuthenticated])

    const [signupData, setSignupData] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "", 
        gender: "" 
    })

    const handleChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        })
    }

    const handleSignup = async () => {
       if(signupData.password !== signupData.confirmPassword){
        return toast.error("password does not match")
       }
        const response = await dispatch(registerUserThunk(signupData))
        if(response?.payload?.success){
            navigate("/")
        }
    }

    return (
        <div className='flex min-h-screen w-full justify-center items-center'>

            {/* Main Box */}
            <div className='flex justify-center items-center p-6 bg-gray-600 flex-col w-[22rem] h-auto rounded-md shadow-lg gap-4'>

                <p className='text-xl w-full text-center text-white font-bold mb-2'>Please Signup</p>

                {/* Fullname */}
                <div className='w-full'>
                    <label className="input validator w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                        <input onChange={handleChange} name='fullName' type="text" required placeholder="Full name" pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30" title="Only letters, numbers or dash" />
                    </label>
                </div>

                {/* Username */}
                <div className='w-full'>
                    <label className="input validator w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                        <input name='username' type="text" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30" title="Only letters, numbers or dash" onChange={handleChange} />
                    </label>
                </div>

                {/* Password - Validation Removed */}
                <div className='w-full'>
                    <label className="input w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                        <input name='password' type="password" required placeholder="Password" onChange={handleChange} />
                    </label>
                </div>

                {/* Confirm Password - Validation Removed */}
                <div className='w-full'>
                    <label className="input w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                        <input name='confirmPassword' type="password" required placeholder="Confirm Password" onChange={handleChange} />
                    </label>
                </div>

                {/* gender */}
                <div className='w-full flex justify-around bg-gray-800 p-2 rounded-md'>

                    {/* Male */}
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            onChange={handleChange}
                            checked={signupData.gender === "male"}
                            className="w-4 h-4 accent-blue-500 cursor-pointer"
                        />
                        <label htmlFor="male" className="text-white cursor-pointer">
                            Male
                        </label>
                    </div>

                    {/* Female */}
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            onChange={handleChange}
                            checked={signupData.gender === "female"}
                            className="w-4 h-4 accent-blue-500 cursor-pointer"
                        />
                        <label htmlFor="female" className="text-white cursor-pointer">
                            Female
                        </label>
                    </div>

                </div>
                
                {/* signup button */}
                <button onClick={handleSignup} className="btn btn-neutral w-full bg-gray-800 border-none text-white hover:bg-gray-900 mt-2">
                    Signup
                </button>

                <div className='text-sm text-white text-center'>
                    <p>Already have an account? <Link to="/Login" className="text-blue-300 hover:underline">Login</Link></p>
                </div>

            </div>
        </div>
    )
}

export default Signup