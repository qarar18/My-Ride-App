const express = require('express');
const Ride = require('../models/Ride');
const User = require('../models/User');
const Rider = require('../models/Rider');
const router = express.Router();

// User: Create a new ride request
router.post('/request', async (req, res) => {
  try {
    const { userId, pickup, dropoff, rideType } = req.body;
    const ride = new Ride({ user: userId, pickup, dropoff, rideType });
    await ride.save();
    res.status(201).json({ message: 'Ride requested', ride });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rider: Get all requested rides (status: Requested)
router.get('/available', async (req, res) => {
  try {
    const rides = await Ride.find({ status: 'Requested' }).populate('user', 'name email');
    res.json(rides);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rider: Accept a ride
router.post('/accept', async (req, res) => {
  try {
    const { rideId, riderId } = req.body;
    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { status: 'Accepted', rider: riderId },
      { new: true }
    ).populate('user', 'name email').populate('rider', 'name email vehicleType vehicleModel plateNumber');
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    res.json({ message: 'Ride accepted', ride });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rider: Reject a ride
router.post('/reject', async (req, res) => {
  try {
    const { rideId, riderId } = req.body;
    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { status: 'Rejected', rider: riderId },
      { new: true }
    );
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    res.json({ message: 'Ride rejected', ride });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User: Get status of a specific ride
router.get('/:rideId/status', async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId)
      .populate('user', 'name email')
      .populate('rider', 'name email vehicleType vehicleModel plateNumber');
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    res.json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User: Get ride history
router.get('/user/:userId/history', async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rider: Get ride history
router.get('/rider/:riderId/history', async (req, res) => {
  try {
    const rides = await Ride.find({ rider: req.params.riderId }).sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User: Cancel a ride
router.post('/:rideId/cancel', async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      req.params.rideId,
      { status: 'Cancelled' },
      { new: true }
    );
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    res.json({ message: 'Ride cancelled', ride });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rider: Complete a ride
router.post('/:rideId/complete', async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      req.params.rideId,
      { status: 'Completed' },
      { new: true }
    );
    if (!ride) return res.status(404).json({ error: 'Ride not found' });
    res.json({ message: 'Ride completed', ride });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 