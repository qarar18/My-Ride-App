import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRider } from '../api';

function RiderSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnic: "",
    vehicleType: "",
    vehicleModel: "",
    plateNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vehicleType) {
      setError('Please select a vehicle type.');
      return;
    }
    // Password validation
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!specialCharRegex.test(formData.password)) {
      setError('Password must contain at least one special character.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await registerRider({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cnic: formData.cnic,
        vehicleType: formData.vehicleType,
        vehicleModel: formData.vehicleModel,
        plateNumber: formData.plateNumber,
      });
      if (res && res.rider && res.rider._id) {
        alert("Rider registered successfully!");
        navigate("/riderLoginPage");
      } else {
        setError(res.error || "Registration failed");
      }
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container purple-bg">
      <div className="form-card purple-card animate-fadein" style={{maxWidth: 800, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0, overflow: 'hidden'}}>
        {/* Personal Information Section */}
        <div style={{flex: 1, minWidth: 0, padding: '2.5rem 2rem', background: 'rgba(255,255,255,0.85)', borderRadius: '18px 0 0 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <h2 className="section-header" style={{fontSize: '2.3rem'}}>Rider Sign Up</h2>
          <form onSubmit={handleSubmit} className="w-100" style={{display: 'flex', flexDirection: 'column', gap: '1.1rem', alignItems: 'center', justifyContent: 'center'}}>
            <div className="section-subheader">Personal Information</div>
            <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="purple-input" />
            <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="purple-input" />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="purple-input" />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="purple-input" />
            <input name="cnic" type="text" placeholder="CNIC Number" value={formData.cnic} onChange={handleChange} required className="purple-input" />
            <div className="section-subheader mt-18">Vehicle Information</div>
            <select name="vehicleType" value={formData.vehicleType} required onChange={handleChange} className="purple-select">
              <option value="">Select Vehicle Type</option>
              <option value="Bike">Bike</option>
              <option value="Car">Car</option>
              <option value="Rickshaw">Rickshaw</option>
            </select>
            <input name="vehicleModel" type="text" placeholder="Vehicle Model" value={formData.vehicleModel} onChange={handleChange} required className="purple-input" />
            <input name="plateNumber" type="text" placeholder="Vehicle Number Plate" value={formData.plateNumber} onChange={handleChange} required className="purple-input" />
            {error && <div className="error-msg">{error}</div>}
            <button type="submit" className="purple-btn" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
          </form>
        </div>
        {/* Vehicle Information Section is merged above for a single form */}
      </div>
    </div>
  );
}

export default RiderSignUp;
