import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import BookingForm from './BookingForm'; // Updated import path
import '../styling/Details.css';
import 'react-calendar/dist/Calendar.css'; // Add the default styles for the calendar

const RoomDetailsPage = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [bookingDays, setBookingDays] = useState(0); // Start with 0 days
  const [totalRent, setTotalRent] = useState(0); // Start with 0 total rent
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/rooms/${roomId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRoom(response.data);
      } catch (error) {
        console.error('Error fetching room details:', error);
        setError(error.response?.data?.message || 'Error fetching room details');
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const onDateChange = (dates) => {
    if (dates.length === 2) {
      const [start, end] = dates;
      if (start && end) {
        setSelectedDates([start, end]);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setBookingDays(diffDays);
        setTotalRent(room ? (room.rentAmount * diffDays) : 0);
      }
    } else {
      // If selecting a single date or clearing selection
      setSelectedDates([]);
      setBookingDays(0);
      setTotalRent(0);
    }
  };

  const isDateBooked = (date) => {
    if (!room || !room.bookings) return false;
    const bookedDates = room.bookings.map(booking => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      return { start, end };
    });
    return bookedDates.some(booking => date >= booking.start && date <= booking.end);
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!room) {
    return <p>Loading...</p>;
  }

  return (
    <div className="room-details">
      <h1>{room.name}</h1>
      <p>{room.description}</p>
      <p>Rent per day: ₹{room.rentAmount}</p>
      <p>Minimum stay: {room.minBookingPeriod} days</p>
      <p>Maximum stay: {room.maxBookingPeriod} days</p>
      <div className="room-photos">
        {room.photos && room.photos.map((photo, index) => (
          <div key={index} className="photo-container">
            <img
              src={`http://localhost:5000/${photo}`}
              alt={`Photo of ${room.name}`}
              className="room-photo"
            />
          </div>
        ))}
      </div>
      <Calendar
        onChange={onDateChange}
        selectRange
        value={selectedDates.length === 2 ? selectedDates : null} // Ensure the calendar reflects the selected range
        tileClassName={({ date }) => isDateBooked(date) ? 'booked' : 'available'} // Check if the date is booked
        tileDisabled={({ date }) => false} // Ensure no date is disabled by default
      />
      <button onClick={() => setShowBookingForm(true)}>Book Room</button>
      {showBookingForm && (
        <BookingForm
          roomId={roomId}
          onClose={() => setShowBookingForm(false)}
          selectedDates={selectedDates}
          bookingDays={bookingDays}
          rentAmount={room.rentAmount}
        />
      )}
      <div className="booking-details">
        <p>Total Rent: ₹{totalRent.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
