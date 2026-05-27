const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('../models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/konantravels';

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing admin to clear double-hashed password
    await Admin.deleteOne({ email: 'admin@konantravels.com' });
    console.log('Cleared existing admin with email admin@konantravels.com if any.');

    const admin = new Admin({
      name: 'Super Admin',
      email: 'admin@konantravels.com',
      password: 'admin123',
      phone: '+91 9876543210',
      role: 'superadmin'
    });

    await admin.save();
    console.log('Super Admin created successfully!');
    console.log('Email: admin@konantravels.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();

