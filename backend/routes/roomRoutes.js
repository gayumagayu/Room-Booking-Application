
// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const upload = require('../middleware/multer');
const authenticateJWT = require('../middleware/authMiddleware');
const roomController = require('../controllers/roomController');
const { getRoomDetails } = require('../controllers/roomController');

// Route to get all available rooms for customers
router.get('/available', authenticateJWT, roomController.getAllRoomsForCustomer);



router.get('/owner', authenticateJWT, roomController.getRoomsByOwner);
// Add room with multiple photos
router.post('/add', upload.array('photos', 10), authenticateJWT, async (req, res) => {
  try {
    const { name, description, minBookingPeriod, maxBookingPeriod, rentAmount, numberOfBeds } = req.body;
    const photos = req.files.map(file => file.path); // Extract file paths
    
    const newRoom = new Room({
      name,
      description,
      minBookingPeriod,
      maxBookingPeriod,
      rentAmount,
      photos,
      numberOfBeds,
      owner: req.user.id
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get all rooms for the logged-in owner
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const rooms = await Room.find({ owner: req.user.id });
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Route to update a specific room
router.put('/update/:id', authenticateJWT, upload.array('photos', 10), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, minBookingPeriod, maxBookingPeriod, rentAmount, numberOfBeds } = req.body;

    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Ensure the user is authorized to update this room
    if (room.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update room details
    room.name = name;
    room.description = description;
    room.minBookingPeriod = minBookingPeriod;
    room.maxBookingPeriod = maxBookingPeriod;
    room.rentAmount = rentAmount;
    room.numberOfBeds = numberOfBeds; 

    // Retain existing photos and append new ones
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => file.path);
      room.photos = [...room.photos, ...newPhotos]; // Merge existing photos with new ones
    }

    await room.save();
    res.json({ message: 'Room updated successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to delete a room
router.delete('/delete/:id', authenticateJWT, async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


///customer
// Route to get a specific room by ID for customers
router.get('/rooms/:roomId', authenticateJWT, getRoomDetails);
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    console.log(`User ID: ${req.user.id}, Role: ${req.user.role}`);
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Check if the user is authorized to view the room
    if (req.user.role !== 'Customer' && room.owner.toString() !== req.user.id) {
      console.log('Unauthorized access attempt');
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(room);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
