import React, { useState, useEffect } from "react";
import { FaMotorcycle, FaCar, FaTaxi, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { requestRide } from '../api';

function UserHome() {
  const [rideType, setRideType] = useState("bike");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      navigate('/userLoginPage', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    alert("Logged out successfully!");
    navigate("/", { replace: true });
  };

  const handleViewRideStatus = () => {
    navigate("/RideStatus");
  };

  const handleViewRideHistory = () => {
    navigate("/RideHistory");
  };

  const handleRequestRide = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const userId = localStorage.getItem('userId');
    if (!pickup || !dropoff) {
      setError("Please enter both pickup and drop-off locations.");
      setLoading(false);
      return;
    }
    try {
      const res = await requestRide({
        userId,
        pickup,
        dropoff,
        rideType: rideType.charAt(0).toUpperCase() + rideType.slice(1),
      });
      if (res && res.ride && res.ride._id) {
        setSuccess("Ride requested successfully!");
        localStorage.setItem('rideId', res.ride._id);
        setPickup("");
        setDropoff("");
      } else {
        setError(res.error || "Failed to request ride.");
      }
    } catch {
      setError("Failed to request ride. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container purple-bg">
      <div className="form-card purple-card animate-fadein">
        <div className="w-100" style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 8}}>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt size={18} style={{ marginRight: 8 }} />
            Logout
          </button>
        </div>
        <h2 className="section-header">Book a Ride</h2>
        <div className="ride-type-options" style={{ display: 'flex', gap: 18, width: '100%', justifyContent: 'center', marginBottom: 18 }}>
          <button
            className={`ride-type-btn ${rideType === "bike" ? "selected" : ""}`}
            style={{ background: rideType === 'bike' ? '#7c3aed' : '#ede9fe', color: rideType === 'bike' ? '#fff' : '#6d28d9', boxShadow: rideType === 'bike' ? '0 2px 8px #a78bfa99' : 'none', transition: 'all 0.2s' }}
            onClick={() => setRideType("bike")}
          >
            <FaMotorcycle size={28} style={{ color: rideType === 'bike' ? '#fff' : '#7c3aed', marginBottom: -4, transition: 'color 0.2s' }} /> Bike
          </button>
          <button
            className={`ride-type-btn ${rideType === "car" ? "selected" : ""}`}
            style={{ background: rideType === 'car' ? '#7c3aed' : '#ede9fe', color: rideType === 'car' ? '#fff' : '#6d28d9', boxShadow: rideType === 'car' ? '0 2px 8px #a78bfa99' : 'none', transition: 'all 0.2s' }}
            onClick={() => setRideType("car")}
          >
            <FaCar size={28} style={{ color: rideType === 'car' ? '#fff' : '#7c3aed', marginBottom: -4, transition: 'color 0.2s' }} /> Car
          </button>
          <button
            className={`ride-type-btn ${rideType === "rickshaw" ? "selected" : ""}`}
            style={{ background: rideType === 'rickshaw' ? '#7c3aed' : '#ede9fe', color: rideType === 'rickshaw' ? '#fff' : '#6d28d9', boxShadow: rideType === 'rickshaw' ? '0 2px 8px #a78bfa99' : 'none', transition: 'all 0.2s' }}
            onClick={() => setRideType("rickshaw")}
          >
            <FaTaxi size={28} style={{ color: rideType === 'rickshaw' ? '#fff' : '#7c3aed', marginBottom: -4, transition: 'color 0.2s' }} /> Rickshaw
          </button>
        </div>
        <form className="input-group w-100" style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center'}} onSubmit={handleRequestRide}>
          <input type="text" placeholder="Pickup Location" value={pickup} onChange={e => setPickup(e.target.value)} required className="purple-input" />
          <input type="text" placeholder="Drop-off Location" value={dropoff} onChange={e => setDropoff(e.target.value)} required className="purple-input" />
          <button className="purple-btn animate-pop" type="submit" disabled={loading}>{loading ? "Requesting..." : "Find a Driver"}</button>
        </form>
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
        <button className="purple-btn animate-pop" style={{marginTop: 10}} onClick={handleViewRideStatus}>View Ride Status</button>
        <button className="purple-btn animate-pop" style={{marginTop: 10, background: '#fff', color: '#7c3aed', border: '1.5px solid #7c3aed'}} onClick={handleViewRideHistory}>View Ride History</button>
      </div>
    </div>
  );
}

export default UserHome;
