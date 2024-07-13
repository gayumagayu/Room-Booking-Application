// backend/controllers/bookingController.js
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Room = require('../models/Room');

const createBooking = async (req, res) => {
  try {
    const { roomId, startDate, endDate, name, age, numberOfPersons, phoneNo, address, totalAmount } = req.body;

    if (!roomId || !startDate || !endDate || !name || !age || !numberOfPersons || !phoneNo || !address || !totalAmount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const bookings = await Booking.find({
      room: roomId,
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
      ]
    });

    if (bookings.length > 0) return res.status(400).json({ message: 'Room is already booked for the selected dates' });

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const newBooking = new Booking({
      room: roomId,
      customer: req.user.id, // User ID should be set by authentication middleware
      startDate,
      endDate,
      name,
      age,
      numberOfPersons,
      phoneNo,
      address,
      totalAmount
    });

    await newBooking.save();

    room.available = false;
    await room.save();

    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBooking
};
