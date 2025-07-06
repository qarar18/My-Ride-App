const mongoose = require('mongoose');

const RiderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vehicleType: { type: String, enum: ['Bike', 'Car', 'Rickshaw'], required: true },
  vehicleModel: { type: String },
  plateNumber: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Rider', RiderSchema); 