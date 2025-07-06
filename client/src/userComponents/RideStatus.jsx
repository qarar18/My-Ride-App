import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMotorcycle, FaCar, FaTaxi, FaUser, FaPhone, FaMapMarkerAlt, FaClock, FaTimes } from "react-icons/fa";
import { getRideStatus, cancelRide } from '../api';

function RideStatus() {
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [error, setError] = useState("");

  // Poll backend for ride status
  useEffect(() => {
    const rideId = localStorage.getItem('rideId');
    if (!rideId) {
      setError('No ride in progress.');
      setTimeout(() => navigate('/', { replace: true }), 1200);
      return;
    }
    let interval;
    const fetchStatus = async () => {
      try {
        const res = await getRideStatus(rideId);
        if (res && res._id) {
          setRide(res);
        } else {
          setError(res.error || 'Ride not found.');
        }
      } catch {
        setError('Failed to fetch ride status.');
      }
    };
    fetchStatus();
    interval = setInterval(fetchStatus, 4000);
    return () => clearInterval(interval);
  }, [navigate]);

  // Timer for elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Navigate to UserHome after cancellation or completion
  useEffect(() => {
    if (ride && (ride.status === "Cancelled" || ride.status === "Completed")) {
      const timer = setTimeout(() => {
        localStorage.removeItem('rideId');
        navigate("/UserHome");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [ride, navigate]);

  const handleBackToHome = () => {
    navigate("/UserHome");
  };

  const handleCancel = async () => {
    if (!ride || ride.status !== "Requested") return;
    try {
      const res = await cancelRide(ride._id);
      if (res && res.ride && res.ride.status === 'Cancelled') {
        setRide(res.ride);
        alert('Ride cancelled successfully!');
      } else {
        alert(res.error || 'Failed to cancel ride.');
      }
    } catch {
      alert('Failed to cancel ride.');
    }
  };

  const getStatusIcon = () => {
    if (!ride) return null;
    switch (ride.rideType?.toLowerCase()) {
      case "bike":
        return <FaMotorcycle size={24} />;
      case "car":
        return <FaCar size={24} />;
      case "rickshaw":
        return <FaTaxi size={24} />;
      default:
        return <FaCar size={24} />;
    }
  };

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case "requested":
        return "#f59e0b";
      case "accepted":
        return "#3b82f6";
      case "in progress":
        return "#10b981";
      case "completed":
        return "#059669";
      case "cancelled":
        return "#ef4444";
      case "rejected":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="page-container purple-bg">
        <div className="ride-status-container purple-card">
          <div className="ride-status-header">
            <h2>Ride Status</h2>
            <button className="back-button purple-btn" style={{padding: '0.1rem 0.3rem', fontSize: '0.7rem'}} onClick={handleBackToHome}>
              <FaTimes size={9} />
            </button>
          </div>
          <div className="error-msg" style={{marginTop: 24}}>{error}</div>
        </div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="page-container purple-bg">
        <div className="ride-status-container purple-card">
          <div className="ride-status-header">
            <h2>Ride Status</h2>
            <button className="back-button purple-btn" style={{padding: '0.1rem 0.3rem', fontSize: '0.7rem'}} onClick={handleBackToHome}>
              <FaTimes size={9} />
            </button>
          </div>
          <div style={{ color: '#7c3aed', marginTop: 32 }}>Loading ride status...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container purple-bg">
      <div className="ride-status-container purple-card">
        <div className="ride-status-header">
          <h2>Ride Status</h2>
          <button className="back-button purple-btn" style={{padding: '0.1rem 0.3rem', fontSize: '0.7rem'}} onClick={handleBackToHome}>
            <FaTimes size={9} />
          </button>
        </div>

        <div className="ride-status-card">
          <div className="ride-info-section">
            <div className="ride-type-display">
              {getStatusIcon()}
              <span className="ride-type-text">{ride.rideType}</span>
            </div>
            <div className="status-display">
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(ride.status) }}
              >
                {ride.status}
              </span>
            </div>
          </div>

          <div className="location-info">
            <div className="location-item">
              <FaMapMarkerAlt className="location-icon pickup" />
              <div>
                <p className="location-label">Pickup</p>
                <p className="location-text">{ride.pickup}</p>
              </div>
            </div>
            <div className="location-item">
              <FaMapMarkerAlt className="location-icon dropoff" />
              <div>
                <p className="location-label">Drop-off</p>
                <p className="location-text">{ride.dropoff}</p>
              </div>
            </div>
          </div>

          {ride.rider && ride.status !== "Requested" && ride.status !== "Rejected" && (
            <div className="driver-info">
              <h3>Driver Information</h3>
              <div className="driver-details">
                <div className="driver-item">
                  <FaUser className="driver-icon" />
                  <span>{ride.rider?.name}</span>
                </div>
                <div className="driver-item">
                  <FaCar className="driver-icon" />
                  <span>{ride.rider?.vehicleModel} ({ride.rider?.plateNumber})</span>
                </div>
                <div className="driver-item">
                  <FaClock className="driver-icon" />
                  <span>ETA: --</span>
                </div>
                {ride.rider?.phone && (
                  <div className="driver-item">
                    <FaPhone className="driver-icon" />
                    <span>{ride.rider.phone}</span>
                  </div>
                )}
              </div>
              <button className="call-driver-btn" onClick={() => alert(`Calling ${ride.rider?.name}${ride.rider?.phone ? ' at ' + ride.rider.phone : ''}`)}>
                <FaPhone size={16} />
                Call Driver
              </button>
            </div>
          )}

          <div className="ride-details">
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className="detail-value">{ride.status}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Fare:</span>
              <span className="detail-value">{ride.fare || '--'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Request Time:</span>
              <span className="detail-value">{ride.createdAt ? new Date(ride.createdAt).toLocaleTimeString() : '--'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Time Elapsed:</span>
              <span className="detail-value">{formatTime(timeElapsed)}</span>
            </div>
          </div>

          {ride.status === "Requested" && (
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel Ride
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RideStatus;
