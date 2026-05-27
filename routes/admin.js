const express = require('express');
const router = express.Router();
const path = require('path');

// Admin Login Page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/login.html'));
});

// Admin Dashboard
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/dashboard.html'));
});

// Admin Manage Bookings
router.get('/bookings', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/bookings.html'));
});

// Admin Manage Fleet
router.get('/fleet', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/fleet.html'));
});

// Admin Manage Services
router.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/services.html'));
});

// Admin Manage FAQs
router.get('/faqs', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/faqs.html'));
});

// Admin Manage Contacts
router.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/contacts.html'));
});

module.exports = router;
