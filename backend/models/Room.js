
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  numberOfBeds: { type: Number, required: true },
  minBookingPeriod: { type: Number, required: true },
  maxBookingPeriod: { type: Number, required: true },
  available: { type: Boolean, default: true },
  photos: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }] // Reference to bookings

});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
