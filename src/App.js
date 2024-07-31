import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/signup" />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default App;
