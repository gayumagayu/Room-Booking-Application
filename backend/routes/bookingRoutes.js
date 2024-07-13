// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');
const authenticate = require('../middleware/authMiddleware');

router.post('/bookings', authenticate, createBooking);

module.exports = router;
