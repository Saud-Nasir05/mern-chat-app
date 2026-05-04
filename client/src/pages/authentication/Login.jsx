

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../slice/user/userThunk'

const Login = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const {isAuthenticated} = useSelector((state) => state.userSlice)
    
    useEffect(()=>{
        if(isAuthenticated){
            navigate("/")
        }
    },[isAuthenticated])

    const [loginData, setLoginData] = useState({
        username: "", 
        password: ""
    })

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin=async(e)=>{
        e.preventDefault();
        const response =await dispatch(loginUserThunk(loginData))
        if(response?.payload?.success){
            navigate("/")
        }
    }
   
    return (
        <div className='flex min-h-screen w-full justify-center items-center'>

            {/* Main Box */}
            <div className='flex justify-center items-center p-6 bg-gray-600 flex-col w-[20rem] h-auto rounded-md shadow-lg gap-3'>

                {/* Header */}
                <p className='text-xl w-full text-left text-white font-bold'>Please Login</p>

                <form  className='w-full flex flex-col gap-3'>
                    
                    {/* Username Field */}
                    <div>
                        <label className="input validator w-full">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input
                                name='username'
                                type="text"
                                required
                                placeholder="Username"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers or dash"
                                onChange={handleChange}
                                value={loginData.username} 
                            />
                        </label>
                        <p className="validator-hint hidden">
                            Must be 3 to 30 characters
                            <br />containing only letters, numbers or dash
                        </p>
                    </div>

                    {/* Password Field - Validation Removed */}
                    <div>
                        <label className="input w-full">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                name='password'
                                type="password"
                                required
                                placeholder="Password"
                                onChange={handleChange}
                                value={loginData.password}
                            />
                        </label>
                    </div>

                    {/* Login Button */}
                    <button onClick={handleLogin} className="btn btn-neutral w-full bg-gray-800 border-none text-white hover:bg-gray-900 mt-2">
                        Login
                    </button>
                </form>

                {/* Signup Line */}
                <div className='text-sm text-white w-full text-center'>
                    <p>Don't have an account? <Link to="/signup" className="text-blue-300 hover:underline">Signup</Link></p>
                </div>

            </div>
        </div>
    )
}

export default Login
