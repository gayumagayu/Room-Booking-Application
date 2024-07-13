// backend/scheduler.js
const cron = require('node-cron');
const Booking = require('./models/Booking');
const Room = require('./models/Room');
const connectDB = require('./config/db'); // Import the connectDB function

// Connect to MongoDB
connectDB();

const checkExpiredBookings = async () => {
  try {
    const now = new Date();
    const expiredBookings = await Booking.find({ endDate: { $lte: now } });

    for (const booking of expiredBookings) {
      const room = await Room.findById(booking.room);
      if (room) {
        room.available = true;
        await room.save();
      }
      await booking.remove();
    }

    console.log(`Checked expired bookings at ${now}`);
  } catch (error) {
    console.error('Error checking expired bookings:', error);
  }
};

// Schedule the job to run every day at midnight
cron.schedule('0 0 * * *', checkExpiredBookings);

module.exports = checkExpiredBookings;
