import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/AuthComponent/Login';
import Register from './Components/AuthComponent/Register';
import ForgotPass from './Components/AuthComponent/ForgotPass';
import VerifyEmail from './Components/AuthComponent/VerifyEmail';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/forgetpass' element={<ForgotPass />} />
      <Route path='/verifyemail' element={<VerifyEmail />} />
    </Routes>
  );
}

export default App;
