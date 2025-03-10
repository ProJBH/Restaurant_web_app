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
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({ email: '', password: '', confirmPassword: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/auth/login', {
      email: form.email,
      password: form.password,
    })
      .then(response => {
        const { token, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', form.email);
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
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
    console.log('Register info:', {
      email: form.email,
      password: form.password,
    });
    setError('Registration functionality is not yet implemented.');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className="mb-3 text-center">{isLogin ? 'Login' : 'Create Account'}</h2>
        {error && <p className={styles.error}>{error}</p>}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <button type="submit" className="btn btn-primary mb-2 w-100">
              Login
            </button>
            <p className={styles.toggleText}>
              Don't have an account?{' '}
              <span
                className={styles.link}
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
              className={styles.input}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <button type="submit" className="btn btn-success mb-2 w-100">Register</button>
            <p className={styles.switchText}>
              Already have an account?{' '}
              <span
                className={styles.link}
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
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
