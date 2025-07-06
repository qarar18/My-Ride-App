import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRider } from '../api';

function RiderLogin()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('riderId')) {
      navigate('/RiderHome', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginRider({ email, password });
      if (res && res.rider && res.rider._id) {
        localStorage.setItem('riderId', res.rider._id);
        alert('Login successful!');
        navigate('/RiderHome', { replace: true });
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
        <h2 className="section-header">Rider Login</h2>
        <form onSubmit={handleLogin} className="w-100" style={{display: 'flex', flexDirection: 'column', gap: '1.1rem', alignItems: 'center', justifyContent: 'center'}}>
          <input type="email" placeholder="Rider Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="purple-input" />
          <input type="password" placeholder="Rider Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="purple-input" />
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="purple-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
};

export default RiderLogin;
