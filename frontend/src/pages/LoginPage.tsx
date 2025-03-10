import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar/Navbar";
import Login from "../components/Login/Login";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Login />
    </div>
  );
};

export default LoginPage;
