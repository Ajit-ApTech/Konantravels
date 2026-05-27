const express = require('express');
const router = express.Router();
const path = require('path');

// Home Page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

// Services Page
router.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/services.html'));
});

// Fleet Page
router.get('/fleet', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/fleet.html'));
});

// Booking Page
router.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/booking.html'));
});

// About Page
router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/about.html'));
});

// Contact Page
router.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/contact.html'));
});

// FAQ Page
router.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/faq.html'));
});

module.exports = router;
