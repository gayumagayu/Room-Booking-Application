
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OwnerDashboard from './pages/OwnerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import RoomDetailsPage from './pages/RoomDetailsPage';

import AddRoom from './pages/AddRoom';
import UpdateRoom from './pages/UpdateRoom';

import './App.css'; 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/rooms/:roomId" element={<RoomDetailsPage />} />
        <Route path="/update-room/:id" element={<UpdateRoom />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/room/:roomId" element={<RoomDetailsPage />} /> 
        
      </Routes>
    </div>
  );
}

export default App;
