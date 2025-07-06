import React, { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAvailableRides, acceptRide, rejectRide, getRiderRideHistory, completeRide } from '../api';

function RiderHome() {
  const [availableRides, setAvailableRides] = useState([]);
  const [rideHistory, setRideHistory] = useState([]);
  const [showRequests, setShowRequests] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('riderId')) {
      navigate('/riderLoginPage', { replace: true });
    } else {
      fetchAvailableRides();
      fetchRideHistory();
    }
    // Poll for new rides every 5 seconds
    const interval = setInterval(fetchAvailableRides, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [navigate]);

  const fetchAvailableRides = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAvailableRides();
      if (Array.isArray(res)) {
        setAvailableRides(res);
      } else {
        setError(res.error || "Failed to fetch available rides.");
      }
    } catch {
      setError("Failed to fetch available rides.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRideHistory = async () => {
    setHistoryLoading(true);
    setHistoryError("");
    try {
      const res = await getRiderRideHistory(localStorage.getItem('riderId'));
      if (Array.isArray(res)) {
        setRideHistory(res);
      } else {
        setHistoryError(res.error || "Failed to fetch ride history.");
      }
    } catch {
      setHistoryError("Failed to fetch ride history.");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('riderId');
    alert("Logged out successfully!");
    navigate("/", { replace: true });
  };

  const handleAccept = async (rideId) => {
    setLoading(true);
    setError("");
    try {
      const res = await acceptRide(rideId, localStorage.getItem('riderId'));
      if (res && res.ride && res.ride._id) {
        alert("Ride Accepted!");
        fetchAvailableRides();
        fetchRideHistory();
      } else {
        setError(res.error || "Failed to accept ride.");
      }
    } catch {
      setError("Failed to accept ride.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (rideId) => {
    setLoading(true);
    setError("");
    try {
      const res = await rejectRide(rideId, localStorage.getItem('riderId'));
      if (res && res.ride && res.ride._id) {
        alert("Ride Rejected!");
        fetchAvailableRides();
        fetchRideHistory();
      } else {
        setError(res.error || "Failed to reject ride.");
      }
    } catch {
      setError("Failed to reject ride.");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (rideId) => {
    setLoading(true);
    setError("");
    try {
      const res = await completeRide(rideId);
      if (res && res.ride && res.ride.status === 'Completed') {
        alert("Ride marked as completed!");
        fetchAvailableRides();
        fetchRideHistory();
      } else {
        setError(res.error || "Failed to complete ride.");
      }
    } catch {
      setError("Failed to complete ride.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container purple-bg">
      <div className="form-card purple-card animate-fadein" style={{maxWidth: 700}}>
        <div className="w-100" style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 8}}>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt size={18} style={{ marginRight: 8 }} />
            Logout
          </button>
        </div>
        <h2 className="section-header">Welcome, Rider!</h2>
        <div className="rider-tabs w-100" style={{display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 18}}>
          <button className={`tab-button ${showRequests ? 'active' : ''}`} style={{ flex: 1, background: showRequests ? 'linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)' : '#f3f0ff', color: showRequests ? '#fff' : '#7c3aed', fontWeight: 700, borderRadius: '999px 0 0 999px', border: 'none', fontSize: '1.1rem', padding: '0.9rem 0', transition: 'background 0.2s' }} onClick={() => setShowRequests(true)}>Incoming Requests</button>
          <button className={`tab-button ${!showRequests ? 'active' : ''}`} style={{ flex: 1, background: !showRequests ? 'linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)' : '#f3f0ff', color: !showRequests ? '#fff' : '#7c3aed', fontWeight: 700, borderRadius: '0 999px 999px 0', border: 'none', fontSize: '1.1rem', padding: '0.9rem 0', transition: 'background 0.2s' }} onClick={() => setShowRequests(false)}>Ride History</button>
        </div>
        {showRequests ? (
          <div className="requests-section purple-card w-100">
            <h3 className="section-title">Incoming Ride Requests</h3>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="error-msg">{error}</div>
            ) : availableRides.length === 0 ? (
              <p className="no-requests" style={{ color: '#64748b', fontSize: '1.1rem', textAlign: 'center', margin: '24px 0' }}>No incoming ride requests at the moment.</p>
            ) : (
              availableRides.map((req) => (
                <div className="request-card" key={req._id} style={{ background: '#f9fafb', borderRadius: 12, boxShadow: '0 2px 8px #7c3aed22', padding: 16, marginBottom: 12 }}>
                  <p><strong>User:</strong> {req.user?.name || 'N/A'}</p>
                  <p><strong>Pickup:</strong> {req.pickup}</p>
                  <p><strong>Drop-off:</strong> {req.dropoff}</p>
                  <p><strong>Type:</strong> {req.rideType}</p>
                  <div className="request-actions" style={{display: 'flex', gap: 8, marginTop: 8}}>
                    <button className="purple-btn" style={{background: '#7c3aed', color: '#fff', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, width: 'auto'}} onClick={() => handleAccept(req._id)}>Accept</button>
                    <button className="logout-btn" style={{borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, width: 'auto'}} onClick={() => handleReject(req._id)}>Reject</button>
                    {(req.status === 'Accepted' || req.status === 'In Progress') && (
                      <button className="purple-btn" style={{background: '#059669', marginLeft: 8, color: '#fff', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, width: 'auto'}} onClick={() => handleComplete(req._id)}>Complete</button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="history-section purple-card w-100">
            <h3 className="section-title">Your Ride History</h3>
            {historyLoading ? (
              <div>Loading...</div>
            ) : historyError ? (
              <div className="error-msg">{historyError}</div>
            ) : rideHistory.length === 0 ? (
              <div style={{ color: '#64748b', fontSize: '1.1rem', textAlign: 'center', margin: '24px 0' }}>No rides yet.</div>
            ) : (
              <div className="history-table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Pickup</th>
                      <th>Drop-off</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rideHistory.map((ride) => (
                      <tr key={ride._id}>
                        <td>{ride.createdAt ? new Date(ride.createdAt).toLocaleDateString() : '--'}</td>
                        <td>{ride.pickup}</td>
                        <td>{ride.dropoff}</td>
                        <td>{ride.rideType}</td>
                        <td>{ride.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RiderHome;
