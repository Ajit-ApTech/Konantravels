const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['hatchback', 'sedan', 'suv', 'tempo_traveller', 'pickup_van', 'mini_truck', 'loading_vehicle', 'house_shifting', 'luxury'],
    default: 'sedan'
  },
  category: {
    type: String,
    enum: ['local', 'outstation', 'cargo', 'luxury'],
    default: 'local'
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  seatingCapacity: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  luggageCapacity: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['petrol', 'diesel', 'cng', 'electric', 'hybrid'],
    default: 'petrol'
  },
  isAC: {
    type: Boolean,
    default: true
  },
  basePricePerKm: {
    type: Number,
    required: true,
    default: 0
  },
  basePricePerHour: {
    type: Number,
    required: true,
    default: 0
  },
  basePriceForTrip: {
    type: Number,
    required: true,
    default: 0
  },
  extraKmPrice: {
    type: Number,
    default: 0
  },
  extraHourPrice: {
    type: Number,
    default: 0
  },
  driverChargePerDay: {
    type: Number,
    default: 0
  },
  availability: {
    type: String,
    enum: ['available', 'booked', 'maintenance', 'inactive'],
    default: 'available'
  },
  features: {
    type: [String],
    default: []
  },
  specs: {
    type: {
      transmission: { type: String, enum: ['manual', 'automatic'] },
      engine: { type: String },
      maxSpeed: { type: Number }
    },
    default: {}
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
