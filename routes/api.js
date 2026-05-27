const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Booking = require('../models/Booking');
const Contact = require('../models/Contact');
const Vehicle = require('../models/Vehicle');
const Service = require('../models/Service');
const FAQ = require('../models/FAQ');
const Testimonial = require('../models/Testimonial');
const Admin = require('../models/Admin');

// ============== Booking APIs ==============

// Create a new booking
router.post('/bookings', async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      serviceType,
      vehicleType,
      pickupLocation,
      dropLocation,
      tripType,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      numberOfPassengers,
      luggageDetails,
      specialNotes,
      paymentPreference,
      estimatedPrice
    } = req.body;

    // Generate booking number
    const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();

    const booking = new Booking({
      bookingNumber: `KT${datePrefix}${randomSuffix}`,
      customerName,
      customerPhone,
      customerEmail,
      serviceType,
      vehicleType,
      pickupLocation,
      dropLocation,
      tripType,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      numberOfPassengers: parseInt(numberOfPassengers) || 1,
      luggageDetails,
      specialNotes,
      paymentPreference,
      estimatedPrice: parseFloat(estimatedPrice) || 0,
      bookingStatus: 'pending'
    });

    await booking.save();
    res.status(201).json({ message: 'Booking submitted successfully', booking });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Failed to submit booking', error: error.message });
  }
});

// Get all bookings (Admin)
router.get('/admin/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
});

// Update booking status (Admin)
router.put('/admin/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { bookingStatus, notes, finalPrice, assignedDriver } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        bookingStatus,
        notes,
        finalPrice: finalPrice || 0,
        assignedDriver
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking', error: error.message });
  }
});

// Get booking by ID
router.get('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch booking', error: error.message });
  }
});

// ============== Contact APIs ==============

// Create a new contact inquiry
router.post('/contacts', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

    await contact.save();
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

// Get all contacts (Admin)
router.get('/admin/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error: error.message });
  }
});

// Update contact status (Admin)
router.put('/admin/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        status,
        response,
        responseDate: new Date()
      },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contact', error: error.message });
  }
});

// ============== Vehicle APIs ==============

// Get all vehicles
router.get('/vehicles', async (req, res) => {
  try {
    const { vehicleType, category, isAC, availability, sort = 'basePricePerKm' } = req.query;
    const filter = {};

    if (vehicleType) filter.vehicleType = vehicleType;
    if (category) filter.category = category;
    if (isAC === 'true') filter.isAC = true;
    if (isAC === 'false') filter.isAC = false;
    if (availability) filter.availability = availability;

    const vehicles = await Vehicle.find(filter).sort({ [sort]: 1 }).lean();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch vehicles', error: error.message });
  }
});

// Get vehicle by ID
router.get('/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch vehicle', error: error.message });
  }
});

// ============== Service APIs ==============

// Get all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ sortOrder: 1, createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
});

// ============== FAQ APIs ==============

// Get all FAQs
router.get('/faqs', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const faqs = await FAQ.find(filter).sort({ sortOrder: 1 }).lean();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch FAQs', error: error.message });
  }
});

// ============== Testimonial APIs ==============

// Get all testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch testimonials', error: error.message });
  }
});

// ============== Admin APIs ==============

// Admin - Get all vehicles (for dashboard)
router.get('/admin/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch vehicles', error: error.message });
  }
});

// Admin - Create vehicle
router.post('/admin/vehicles', async (req, res) => {
  try {
    const vehicleData = req.body;
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    res.status(201).json({ message: 'Vehicle created successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create vehicle', error: error.message });
  }
});

// Admin - Update vehicle
router.put('/admin/vehicles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const vehicleData = req.body;

    const vehicle = await Vehicle.findByIdAndUpdate(id, vehicleData, { new: true });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ message: 'Vehicle updated successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update vehicle', error: error.message });
  }
});

// Admin - Delete vehicle
router.delete('/admin/vehicles/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete vehicle', error: error.message });
  }
});

// Admin - Get all services (for dashboard)
router.get('/admin/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
});

// Admin - Create service
router.post('/admin/services', async (req, res) => {
  try {
    const serviceData = req.body;
    const service = new Service(serviceData);
    await service.save();
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error: error.message });
  }
});

// Admin - Update service
router.put('/admin/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const serviceData = req.body;

    const service = await Service.findByIdAndUpdate(id, serviceData, { new: true });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service updated successfully', service });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update service', error: error.message });
  }
});

// Admin - Delete service
router.delete('/admin/services/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
});

// Admin - Get all FAQs (for dashboard)
router.get('/admin/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch FAQs', error: error.message });
  }
});

// Admin - Create FAQ
router.post('/admin/faqs', async (req, res) => {
  try {
    const faqData = req.body;
    const faq = new FAQ(faqData);
    await faq.save();
    res.status(201).json({ message: 'FAQ created successfully', faq });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create FAQ', error: error.message });
  }
});

// Admin - Update FAQ
router.put('/admin/faqs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const faqData = req.body;

    const faq = await FAQ.findByIdAndUpdate(id, faqData, { new: true });

    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.json({ message: 'FAQ updated successfully', faq });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update FAQ', error: error.message });
  }
});

// Admin - Delete FAQ
router.delete('/admin/faqs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete FAQ', error: error.message });
  }
});

// Admin - Get all testimonials (for dashboard)
router.get('/admin/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch testimonials', error: error.message });
  }
});

// ============== Admin Login API ==============
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    res.json({
      message: 'Login successful',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = router;
