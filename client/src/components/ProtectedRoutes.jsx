import React from 'react'
import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
const ProtectedRoutes = ({children}) => {
  const { isAuthenticated, screenLoading } = useSelector((state) => state.userSlice);
    const navigate=useNavigate()
    useEffect(()=>{
        if(!isAuthenticated && !screenLoading){
            navigate("/login")
        }
    },[isAuthenticated,screenLoading])
    return isAuthenticated ? children : null;
}

export default ProtectedRoutes