// backend/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  numberOfPersons: { type: Number, required: true },
  phoneNo: { type: String, required: true },
  address: { type: String, required: true },
  totalAmount: { type: Number, required: true }  // Add this line
});

module.exports = mongoose.model('Booking', bookingSchema);
