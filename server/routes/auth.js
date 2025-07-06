const express = require('express');
const User = require('../models/User');
const Rider = require('../models/Rider');
const router = express.Router();

// User Registration
router.post('/user/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User Login (dummy, no hashing)
router.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rider Registration
router.post('/rider/register', async (req, res) => {
  try {
    const { name, email, password, vehicleType, vehicleModel, plateNumber } = req.body;
    const rider = new Rider({ name, email, password, vehicleType, vehicleModel, plateNumber });
    await rider.save();
    res.status(201).json({ message: 'Rider registered', rider });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rider Login (dummy, no hashing)
router.post('/rider/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const rider = await Rider.findOne({ email, password });
    if (!rider) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', rider });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 