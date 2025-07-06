import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div className="page-container purple-bg">
      <div className="form-card purple-card animate-fadein">
        <h2 style={{ color: '#7c3aed', fontWeight: 700, fontSize: '1.3rem', marginBottom: 24 }}>Select Role to Sign Up</h2>
        <button className="purple-btn" onClick={() => navigate("/UserSignUp")}>Sign Up as User</button>
        <button className="purple-btn" onClick={() => navigate("/RiderSignUp")}>Sign Up as Rider</button>
        <button className="purple-btn" style={{ background: '#fff', color: '#7c3aed', border: '1.5px solid #7c3aed', marginTop: 10 }} onClick={handleLoginClick}>Back to Login</button>
      </div>
    </div>
  );
}

export default SignUp;
