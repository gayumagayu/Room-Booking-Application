// frontend/src/pages/BookingForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styling/BookingForm.css';

const BookingForm = ({ roomId, onClose, selectedDates, bookingDays, rentAmount }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingDetails = {
      roomId,
      name,
      age,
      numberOfPersons,
      phoneNo: phone,
      address,
      startDate: selectedDates[0].toISOString().split('T')[0],
      endDate: selectedDates[1].toISOString().split('T')[0],
      totalAmount: rentAmount * bookingDays
    };

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', bookingDetails, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      alert('Booking successful');
      onClose();
    } catch (error) {
      console.error('Error booking room:', error.response?.data?.message || error.message);
      alert('Error booking room: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="booking-form">
      <h2>Book Room</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </label>
        <label>
          Number of Persons:
          <input type="number" value={numberOfPersons} onChange={(e) => setNumberOfPersons(e.target.value)} required />
        </label>
        <label>
          Phone Number:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          Address:
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <label>
          Start Date:
          <input type="date" value={selectedDates[0]?.toISOString().split('T')[0] || ''} readOnly />
        </label>
        <label>
          End Date:
          <input type="date" value={selectedDates[1]?.toISOString().split('T')[0] || ''} readOnly />
        </label>
        <label>
          Total Rent: ₹{(rentAmount * bookingDays).toFixed(2)}
        </label>
        <button type="submit">Book</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default BookingForm;
