import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Plan from './pages/plan/planPage';
import Home from './home/homePage';
import Login from './pages/login/loginUser';
import Register from './pages/register/registerUser'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
