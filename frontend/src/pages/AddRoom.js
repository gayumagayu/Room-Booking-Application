
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styling/AddRoom.css'; // Correct path to the CSS file

const AddRoom = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minBookingPeriod, setMinBookingPeriod] = useState('');
  const [maxBookingPeriod, setMaxBookingPeriod] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [numberOfBeds, setNumberOfBeds] = useState('');
  const [photos, setPhotos] = useState([]);
 
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePhotoChange = (event) => {
    setPhotos(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('minBookingPeriod', minBookingPeriod);
    formData.append('maxBookingPeriod', maxBookingPeriod);
    formData.append('rentAmount', rentAmount);
    formData.append('numberOfBeds', numberOfBeds);
    
    for (let i = 0; i < photos.length; i++) {
      formData.append('photos', photos[i]); // Append each file
    }

    try {
      await axios.post('http://localhost:5000/api/rooms/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Redirect to the Owner Dashboard upon successful addition
      navigate('/owner-dashboard');
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Add Room</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Room Name" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Room Description" required />
        <input type="number" value={minBookingPeriod} onChange={(e) => setMinBookingPeriod(e.target.value)} placeholder="Min Booking Period" required />
        <input type="number" value={maxBookingPeriod} onChange={(e) => setMaxBookingPeriod(e.target.value)} placeholder="Max Booking Period" required />
        <input type="number" value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} placeholder="Rent Amount" required />
        <input type="number" value={numberOfBeds} onChange={(e) => setNumberOfBeds(e.target.value)} placeholder="Number of Beds" required />
        <input type="file" multiple onChange={handlePhotoChange} required />
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;

