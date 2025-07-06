import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

  return (
    <div className="page-container purple-bg">
      <div className="form-card purple-card animate-fadein">
        <h1 style={{ color: '#7c3aed', fontWeight: 800, fontSize: '2.2rem', marginBottom: 8 }}>MYRIDE</h1>
        <h2 style={{ color: '#7c3aed', fontWeight: 700, fontSize: '1.3rem', marginBottom: 24 }}>Select Role to Login</h2>
        <button className="purple-btn" onClick={() => navigate("/riderLoginPage") }>Login as Rider</button>
        <button className="purple-btn" onClick={() => navigate("/userLoginPage")}>Login as User</button>
        <div style={{ width: '100%', borderTop: '1px solid #e5e7eb', margin: '18px 0 0 0', paddingTop: 12, textAlign: 'center' }}>
          <span style={{ color: '#7c3aed', fontWeight: 500 }}>Don't have an account?</span>
          <Link to="/SignUp" style={{ color: '#7c3aed', fontWeight: 700, textDecoration: 'underline', marginTop: 10, display: 'inline-block', cursor: 'pointer', fontSize: '1.08rem' }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
