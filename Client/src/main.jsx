import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Calendar from './pages/calendarapp/calendar';
import Home from './pages/homepage/HomePage';
import Login from './pages/login/loginUser';
import Register from './pages/register/registerUser'; 
import LandingPage from './pages/landingpage/LandingPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/landing" element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
