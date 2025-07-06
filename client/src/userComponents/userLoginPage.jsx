import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';

export default function UserLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userId');
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser({ email: form.email, password: form.password });
      if (res && res.user && res.user._id) {
        localStorage.setItem('userId', res.user._id);
        alert('Login successful!');
        navigate('/UserHome', { replace: true });
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container purple-bg">
      <div className="form-card purple-card animate-fadein">
        <h2 className="section-header">Login Form</h2>
        <form onSubmit={handleSubmit} className="w-100" style={{display: 'flex', flexDirection: 'column', gap: '1.1rem', alignItems: 'center', justifyContent: 'center'}}>
          <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className="purple-input" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="purple-input" />
          <div className="text-right w-100 mb-8" style={{textAlign: 'right', width: '70%', maxWidth: 220}}>
            <Link to="#" style={{ color: '#7c3aed', fontSize: '0.98rem', textDecoration: 'underline' }}>Forgot password?</Link>
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="purple-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <div className="mt-18 text-center w-100" style={{fontSize: '1.05rem', color: '#18181b'}}>
          Not a member?{' '}
          <Link to="/user/signup" style={{ color: '#7c3aed', fontWeight: 700, textDecoration: 'underline' }}>Signup now</Link>
        </div>
      </div>
    </div>
  );
}
