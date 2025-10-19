import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Landlist from './pages/Landlist/Landlist';
import AIChat from './pages/AIChat/AIChat';
import Registerlandbutton from './pages/Registerland/Registerlandbutton';
import BuyerRequestForm from './pages/BuyerRequestForm/BuyerRequestForm';
import Buyerrequiest from './pages/Buyerrequies/Buyerrequiest';

// Components
import Hero from './componets/Hero/Hero';
import TalkToGeminiButton from './componets/TalkToGeminiButtonx/TalkToGeminiButton';
// import ProtectedRoute from './componets/ProtectedRoute';import ProtectedRoute from

import ProtectedRoute from './componets/ProtectedRoute ';
import LandlistB from './pages/BuyersSide/LandlistB';
import Sidebar from './pages/Dashboard/Sidebar';


function App() {
  return (
    <Router>
      <TalkToGeminiButton />
     
      <Routes>
        {/* Public Page */}
        <Route path="/" element={<Hero />} />
        LandlistB
        
        {/* Public Page */}
        <Route path="/LandlistB" element={<LandlistB/>} />

        {/* Secure Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Sidebar"
          element={
            <ProtectedRoute>
              <Sidebar/>
            </ProtectedRoute>
          }
        />
         
        <Route
          path="/register-land"
          element={
            <ProtectedRoute>
              <Registerlandbutton />
            </ProtectedRoute>
          }
        />
        <Route
          path="/landlist"
          element={
            <ProtectedRoute>
              <Landlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gemini"
          element={
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyerrequestform"
          element={
            <ProtectedRoute>
              <BuyerRequestForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyerrequiest"
          element={
            <ProtectedRoute>
              <Buyerrequiest />
            </ProtectedRoute>
          }
        />

        {/* Optional auth pages if you have them */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
