import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './Login.module.scss';

interface Form {
  email: string;
  password: string;
  confirmPassword?: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<Form>({ email: '', password: '', confirmPassword: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/auth/login', {
      email: form.email,
      password: form.password,
    })
      .then(response => {
        const { token, role } = response.data;
        if (role === 'admin') {
          localStorage.setItem('token', token);
          navigate('/admin/dashboard');
        } else {
            localStorage.setItem('token', token);
            navigate('/customer/dashboard');
        }
      })
      .catch(() => setError('Login failed.'));
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Temporarily log user info to console
    console.log({
      email: form.email,
      password: form.password,
    });
  };

  return (
    <div className={`container ${styles.container}`} style={{ marginTop: '5rem' }}>
      <h1>{isLogin ? 'Admin Login' : 'Create Account'}</h1>
      {error && <p className="text-danger">{error}</p>}

      {isLogin ? (
        <form onSubmit={handleLoginSubmit}>
          <input 
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-control mb-3"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="form-control mb-3"
          />
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <p className="mt-2">
            No account?{' '}
            <span
              className="text-primary"
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => {
                setIsLogin(false);
                setError('');
                setForm({ email: '', password: '', confirmPassword: '' });
              }}
            >
              Create Account
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-control mb-3"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="form-control mb-3"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="form-control mb-3"
          />
          <button type="submit" className="btn btn-success mb-2 w-100">Register</button>
          <p>
            <span
              className="text-primary"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setIsLogin(true);
                setError('');
                setForm({ email: '', password: '', confirmPassword: '' });
              }}
            >
              Back to Login
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
