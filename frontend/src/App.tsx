// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import AdminDashBoardPage from './pages/AdminDashBoardPage';
import AboutUsPage from './pages/AboutUsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path='/aboutus' element={<AboutUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashBoardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
