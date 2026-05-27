const mongoose = require('mongoose');

const serviceAreaSchema = new mongoose.Schema({
  areaName: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  serviceType: {
    type: String,
    enum: ['all', 'local', 'outstation', 'cargo'],
    default: 'all'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ServiceArea', serviceAreaSchema);
