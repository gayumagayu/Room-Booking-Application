import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styling/AddRoom.css'; // Import the shared CSS file

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    name: '',
    description: '',
    minBookingPeriod: '',
    maxBookingPeriod: '',
    rentAmount: '',
    numberOfBeds: '',
    photos: []
  });

  useEffect(() => {
    const fetchRoom = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRoom(response.data);
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };
    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value
    }));
  };

  const handlePhotoChange = (event) => {
    setRoom((prevRoom) => ({
      ...prevRoom,
      photos: Array.from(event.target.files) // Convert FileList to Array
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', room.name);
    formData.append('description', room.description);
    formData.append('minBookingPeriod', room.minBookingPeriod);
    formData.append('maxBookingPeriod', room.maxBookingPeriod);
    formData.append('rentAmount', room.rentAmount);
    formData.append('numberOfBeds', room.numberOfBeds);

    for (let i = 0; i < room.photos.length; i++) {
      formData.append('photos', room.photos[i]);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/rooms/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/owner-dashboard'); // Redirect or update state as needed
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Update Room</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={room.name} 
          onChange={handleChange} 
          placeholder="Room Name" 
          required 
        />
        <textarea 
          name="description" 
          value={room.description} 
          onChange={handleChange} 
          placeholder="Room Description" 
          required 
        />
        <input 
          type="number" 
          name="minBookingPeriod" 
          value={room.minBookingPeriod} 
          onChange={handleChange} 
          placeholder="Min Booking Period" 
          required 
        />
        <input 
          type="number" 
          name="maxBookingPeriod" 
          value={room.maxBookingPeriod} 
          onChange={handleChange} 
          placeholder="Max Booking Period" 
          required 
        />
        <input 
          type="number" 
          name="rentAmount" 
          value={room.rentAmount} 
          onChange={handleChange} 
          placeholder="Rent Amount" 
          required 
        />
        <input 
          type="number" 
          name="numberOfBeds" 
          value={room.numberOfBeds} 
          onChange={handleChange} 
          placeholder="Number of Beds" 
          required 
        />
        <input 
          type="file" 
          multiple 
          onChange={handlePhotoChange} 
        />
        <button type="submit">Update Room</button>
      </form>
    </div>
  );
};

export default UpdateRoom;
