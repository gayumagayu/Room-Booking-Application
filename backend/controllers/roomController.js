const Room = require('../models/Room');

// Create a new room
const createRoom = async (req, res) => {
  try {
    const { name, description, rentAmount, numberOfBeds, minBookingPeriod, maxBookingPeriod } = req.body;
    const photos = req.files ? req.files.map(file => file.path) : []; // Handling file paths

    const room = new Room({
      name,
      description,
      rentAmount,
      numberOfBeds,
      minBookingPeriod,
      maxBookingPeriod,
      photos,
      //extra
      owner: req.user.id,
    });

    await room.save();
    res.status(201).json({ message: 'Room created successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Error creating room', error: error.message });
  }
};

// Update a room
// Update Room function
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      name: req.body.name,
      description: req.body.description,
      minBookingPeriod: req.body.minBookingPeriod,
      maxBookingPeriod: req.body.maxBookingPeriod,
      rentAmount: req.body.rentAmount,
      numberOfBeds: req.body.numberOfBeds,
    };

    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Ensure the user is authorized to update this room
    if (room.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update room details
    Object.assign(room, updates);

    // Retain existing photos and append new ones
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => file.path);
      room.photos = [...room.photos, ...newPhotos]; // Merge existing photos with new ones
    }

    await room.save();
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a room
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoomsByOwner = async (req, res) => {
  try {
    const ownerId = req.user.id; // Assuming JWT middleware adds user info to req
    const rooms = await Room.find({ owner: ownerId });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
};

///customer 

// Get all available rooms for customers
const getAllRoomsForCustomer = async (req, res) => {
  try {
    const rooms = await Room.find(); // Adjust query to include available status if needed
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Error fetching rooms' });
  }
};
//// for both onwer and cutomwr updates.....

const getRoomDetails = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Check if the user is authorized to view the room
    if (req.user.role === 'Customer') {
      // Customers can view any room
      return res.json(room);
    } else if (req.user.role === 'HouseOwner') {
      // House owners can only view their own rooms
      if (room.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      return res.json(room);
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error fetching room details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomsByOwner,
  getRoomDetails,
  getAllRoomsForCustomer
  
};
