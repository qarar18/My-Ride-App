const API_BASE = "http://localhost:5000/api";

// --- Auth ---
export const registerUser = (data) =>
  fetch(`${API_BASE}/auth/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const loginUser = (data) =>
  fetch(`${API_BASE}/auth/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const registerRider = (data) =>
  fetch(`${API_BASE}/auth/rider/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const loginRider = (data) =>
  fetch(`${API_BASE}/auth/rider/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

// --- Rides ---
export const requestRide = (data) =>
  fetch(`${API_BASE}/rides/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getAvailableRides = () =>
  fetch(`${API_BASE}/rides/available`).then(res => res.json());

export const acceptRide = (rideId, riderId) =>
  fetch(`${API_BASE}/rides/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rideId, riderId }),
  }).then(res => res.json());

export const rejectRide = (rideId, riderId) =>
  fetch(`${API_BASE}/rides/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rideId, riderId }),
  }).then(res => res.json());

export const getRideStatus = (rideId) =>
  fetch(`${API_BASE}/rides/${rideId}/status`).then(res => res.json());

export const getUserRideHistory = (userId) =>
  fetch(`${API_BASE}/rides/user/${userId}/history`).then(res => res.json());

export const getRiderRideHistory = (riderId) =>
  fetch(`${API_BASE}/rides/rider/${riderId}/history`).then(res => res.json());

export const cancelRide = (rideId) =>
  fetch(`${API_BASE}/rides/${rideId}/cancel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json());

export const completeRide = (rideId) =>
  fetch(`${API_BASE}/rides/${rideId}/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json()); 