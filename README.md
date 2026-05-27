# Konan Travels - Premium Travel Booking Platform

A modern, premium travel and vehicle rental booking website built with Node.js, Express, MongoDB, and Tailwind CSS.

## Features

### Customer-Facing Features
- **Home Page**: Hero section with 3D-style design, quick booking bar, featured vehicles, services showcase
- **Services Page**: Comprehensive list of travel services (local, outstation, airport transfer, house shifting, loading/unloading, goods transport, tempo traveller, driver on demand)
- **Fleet Page**: Browse vehicles with filters (type, price range, AC/non-AC, seats) and sorting options
- **Booking Page**: Multi-step booking form with service selection, vehicle choice, trip details, and customer information
- **About Page**: Company information with mission and values
- **Contact Page**: Contact form with location map
- **FAQ Page**: Frequently asked questions with category filtering

### Admin Features
- Admin login system with password hashing
- Dashboard with statistics and recent bookings
- Manage bookings (view, update status, assign drivers)
- Manage fleet vehicles (add, edit, delete, update availability)
- Manage services, FAQs, testimonials
- Manage customer inquiries and respond

### Technical Features
- Glassmorphism UI effects
- Particle canvas animations
- Neon glow accents
- Custom cursor
- Responsive design (mobile-first)
- Smooth animations and transitions
- SEO-friendly structure
- MongoDB database integration
- Express session-based admin authentication
- API routes for all CRUD operations

## Tech Stack

### Frontend
- HTML5
- Tailwind CSS v4 (via CDN)
- Vanilla JavaScript
- Font Awesome (icons)
- Google Fonts (Inter)

### Backend
- Node.js 18+
- Express.js
- MongoDB
- Mongoose
- bcryptjs (password hashing)
- express-session (authentication)
- Multer (file uploads)
- Cloudinary (image storage)

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   Update the `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/konantravels
   SESSION_SECRET=your-secure-secret-key-here
   PORT=3000
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system (port 27017).

4. **Create admin user**
   ```bash
   npm run seed-admin
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Website: http://localhost:3000
   - Admin login: http://localhost:3000/admin/login
   - Default admin credentials:
     - Email: admin@konantravels.com
     - Password: admin123

## Project Structure

```
konantravels/
├── public/
│   ├── admin/
│   │   ├── css/
│   │   │   └── admin.css
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   ├── bookings.html
│   │   ├── fleet.html
│   │   ├── services.html
│   │   ├── faqs.html
│   │   └── contacts.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── views/
│       ├── index.html
│       ├── services.html
│       ├── fleet.html
│       ├── booking.html
│       ├── about.html
│       ├── contact.html
│       └── faq.html
├── models/
│   ├── Admin.js
│   ├── Vehicle.js
│   ├── Booking.js
│   ├── Contact.js
│   ├── Service.js
│   ├── FAQ.js
│   ├── Testimonial.js
│   └── ServiceArea.js
├── routes/
│   ├── api.js
│   ├── views.js
│   └── admin.js
├── config/
│   └── db.js
├── middleware/
│   └── auth.js
├── scripts/
│   └── createAdmin.js
├── server.js
├── package.json
└── .env
```

## API Routes

### Public Routes
- `POST /api/bookings` - Create a booking
- `POST /api/contacts` - Create a contact inquiry
- `GET /api/vehicles` - Get all vehicles (with filters)
- `GET /api/vehicles/:id` - Get vehicle by ID
- `GET /api/services` - Get all services
- `GET /api/faqs` - Get all FAQs
- `GET /api/testimonials` - Get all testimonials

### Admin Routes
- `POST /api/admin/login` - Admin login
- `GET /api/admin/bookings` - Get all bookings
- `PUT /api/admin/bookings/:id` - Update booking
- `GET /api/admin/vehicles` - Get all vehicles
- `POST /api/admin/vehicles` - Create vehicle
- `PUT /api/admin/vehicles/:id` - Update vehicle
- `DELETE /api/admin/vehicles/:id` - Delete vehicle
- `GET /api/admin/contacts` - Get all contacts
- `PUT /api/admin/contacts/:id` - Update contact
- `GET /api/admin/faqs` - Get all FAQs
- `POST /api/admin/faqs` - Create FAQ
- `PUT /api/admin/faqs/:id` - Update FAQ

## Customization

### Brand Colors
Update the following in `tailwind.config` and CSS files:
- Primary: `#00f3ff` (Cyan)
- Secondary: `#bc13fe` (Purple)

### Add Cloudinary Integration
For image uploads, configure Cloudinary in `server.js`:
```javascript
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
```

### Add Payment Gateway
Integrate payment gateway (Stripe, Razorpay, etc.) in the booking flow.

## Security Notes

- Change `SESSION_SECRET` in `.env` to a strong random string in production
- Configure proper CORS settings
- Add rate limiting for API endpoints
- Implement input validation
- Use HTTPS in production
- Set up proper MongoDB authentication

## Future Enhancements

- User accounts and authentication
- Payment gateway integration
- Email notifications
- Real-time tracking
- Driver management system
- Mobile app
- Multi-language support
- Advanced search and filtering

## License

MIT License - feel free to use this code for your projects.