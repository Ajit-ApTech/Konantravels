const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingNumber: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['local', 'outstation', 'airport_transfer', 'loading_unloading', 'house_shifting', 'goods_transport', 'driver_on_demand']
  },
  vehicleType: {
    type: String,
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  pickupLocation: {
    type: String,
    required: true,
    trim: true
  },
  dropLocation: {
    type: String,
    required: true,
    trim: true
  },
  tripType: {
    type: String,
    enum: ['one-way', 'round-trip'],
    default: 'one-way'
  },
  pickupDate: {
    type: Date,
    required: true
  },
  pickupTime: {
    type: String,
    required: true
  },
  returnDate: {
    type: Date
  },
  returnTime: {
    type: String
  },
  tripDuration: {
    type: String
  },
  numberOfPassengers: {
    type: Number,
    default: 1
  },
  luggageDetails: {
    type: String,
    trim: true
  },
  specialNotes: {
    type: String,
    trim: true
  },
  paymentPreference: {
    type: String,
    enum: ['online', 'cash', 'upi', 'card', 'wallet'],
    default: 'cash'
  },
  estimatedPrice: {
    type: Number,
    required: true
  },
  finalPrice: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'rejected'],
    default: 'pending'
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
