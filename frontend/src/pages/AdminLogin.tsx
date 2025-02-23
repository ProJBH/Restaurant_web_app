// src/pages/AdminLogin.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "../components/Navbar";

const AdminLogin: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/auth/login', form)
      .then(response => {
        const { token, role } = response.data;
        if (role === 'admin') {
          localStorage.setItem('token', token);
          navigate('/admin/dashboard');
        } else {
          setError('You are not an admin.');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Login failed.');
      });
  };

  return (
    <div>
      <Navbar />
      <h1>Admin Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
