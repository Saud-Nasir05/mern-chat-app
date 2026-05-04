import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import {  getUserProfileThunk } from './slice/user/userThunk';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {
  const dispatch = useDispatch();
  
useEffect(() => {
    // Dono ko alag alag line par likha hai aur dono ke aagay () lagaye hain
    dispatch(getUserProfileThunk());
  }, [dispatch]);

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      
      <Routes>
        {/* CORRECT: Wrap the component inside the 'element' prop */}
        <Route 
          path='/' 
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } 
        />
        
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;