import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRideHistory } from '../api';

function RideHistory() {
  const [rideHistory, setRideHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      navigate('/', { replace: true });
      return;
    }
    setLoading(true);
    setError("");
    getUserRideHistory(localStorage.getItem('userId'))
      .then(res => {
        if (Array.isArray(res)) {
          setRideHistory(res);
        } else {
          setError(res.error || "Failed to fetch ride history.");
        }
      })
      .catch(() => setError("Failed to fetch ride history."))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="page-container purple-bg">
      <div className="history-section purple-card" style={{maxWidth: 600}}>
        <button className="purple-btn" style={{marginBottom: 24}} onClick={() => navigate('/UserHome')}>Back to Home</button>
        <h3 className="section-title">Your Ride History</h3>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="error-msg">{error}</div>
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
    </div>
  );
}

export default RideHistory; 