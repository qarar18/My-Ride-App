const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  rideType: { type: String, enum: ['Bike', 'Car', 'Rickshaw'], required: true },
  status: { type: String, enum: ['Requested', 'Accepted', 'Rejected', 'In Progress', 'Completed', 'Cancelled'], default: 'Requested' },
  fare: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Ride', RideSchema); 