import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';

export default function UserSignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Password validation
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }
    if (!specialCharRegex.test(form.password)) {
      setError('Password must contain at least one special character.');
      setLoading(false);
      return;
    }
    try {
      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (res && res.user && res.user._id) {
        alert("User registered successfully!");
        navigate("/userLoginPage");
      } else {
        setError(res.error || "Registration failed");
      }
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-container purple-bg">
      <div className="form-card purple-card animate-fadein" style={{maxWidth: 800, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0, overflow: 'hidden'}}>
        <div
          style={{flex: 1, minWidth: 0, padding: '2.5rem 2rem', background: 'rgba(255,255,255,0.85)', borderRadius: '18px 0 0 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
        >
          <h2 className="section-header" style={{fontSize: '2.3rem'}}>Sign Up</h2>
          <form
            onSubmit={handleSubmit}
            className="w-100"
            style={{display: 'flex', flexDirection: 'column', gap: '1.1rem', alignItems: 'center', justifyContent: 'center'}}
          >
            <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} required className="purple-input" />
            <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className="purple-input" />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="purple-input" />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required className="purple-input" />
            {error && <div className="error-msg">{error}</div>}
            <button type="submit" className="purple-btn" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
          </form>
          <div
            style={{
              marginTop: 18,
              fontSize: '1.05rem',
              color: '#18181b',
              textAlign: 'center',
              width: '100%',
            }}
          >
            Already have an account?{' '}
            <Link
              to="/user/login"
              style={{
                color: '#18181b',
                fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              Log in
            </Link>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.60)',
            borderRadius: '0 18px 18px 0',
            alignItems: 'center',
            gap: '1.2rem',
          }}
        >
          <div style={{ color: '#18181b', fontWeight: 600, marginBottom: 8 }}>Or</div>
          <button
            className="social-btn"
            type="button"
            style={{
              width: 240,
              height: 54,
              fontSize: '1.08rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              fontWeight: 600,
              letterSpacing: 0.2,
            }}
          >
            <span style={{ fontSize: 22, marginRight: 8, display: 'flex', alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 48 48">
                <g>
                  <path
                    fill="#4285F4"
                    d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 4.5 29.6 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20c11.1 0 20-8.9 20-20 0-1.3-0.1-2.7-0.3-4z"
                  />
                  <path
                    fill="#34A853"
                    d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 4.5 29.6 2 24 2 15.1 2 7.6 7.7 6.3 14.7z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M24 44c5.8 0 10.7-1.9 14.3-5.1l-6.6-5.4C29.8 37 24 37 24 37c-5.8 0-10.7-1.9-14.3-5.1l6.6-5.4C18.2 33.9 23.1 37 24 37z"
                  />
                  <path
                    fill="#EA4335"
                    d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 4.5 29.6 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20c11.1 0 20-8.9 20-20 0-1.3-0.1-2.7-0.3-4z"
                  />
                </g>
              </svg>
            </span>
            Sign up with Google
          </button>
          <button
            className="social-btn"
            type="button"
            style={{
              width: 240,
              height: 54,
              fontSize: '1.08rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              fontWeight: 600,
              letterSpacing: 0.2,
            }}
          >
            <span style={{ fontSize: 22, marginRight: 8, display: 'flex', alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 48 48">
                <g>
                  <path
                    fill="#3b5998"
                    d="M24 2C12.9 2 4 10.9 4 22c0 9.9 7.2 18.1 16.5 19.7V30.1h-5v-6.1h5v-4.7c0-5 3-7.7 7.5-7.7c2.2 0 4.5.4 4.5.4v5h-2.5c-2.5 0-3.3 1.6-3.3 3.2v3.8h5.6l-.9 6.1h-4.7v11.6C36.8 40.1 44 31.9 44 22C44 10.9 35.1 2 24 2z"
                  />
                </g>
              </svg>
            </span>
            Sign up with Facebook
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 1200px) {
          .form-card {
            max-width: 98vw !important;
          }
        }
        @media (max-width: 900px) {
          .form-card {
            flex-direction: column !important;
            max-width: 98vw !important;
          }
          .form-card > div {
            border-radius: 18px !important;
          }
        }
        @media (max-width: 600px) {
          .form-card {
            padding: 0.5rem 0.2rem !important;
          }
          .form-card > div {
            padding: 1.2rem 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
