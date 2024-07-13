import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSignOutAlt, faList, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styling/OwnerDashboard.css';

const OwnerDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [view, setView] = useState('rooms');
  const [ownerName, setOwnerName] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwnerData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/owners/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOwnerName(response.data.name);
      } catch (error) {
        console.error('Error fetching owner data:', error);
      }
    };

    const fetchRooms = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/rooms', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchOwnerData();
    fetchRooms();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/rooms/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRooms(rooms.filter(room => room._id !== id));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-room/${id}`);
  };

  const renderView = () => {
    switch (view) {
      case 'rooms':
        return (
          <div className="rooms-container">
            {rooms.length > 0 ? (
              rooms.map(room => (
                <div key={room._id} className="room-card">
                  <h2>{room.name}</h2>
                  <p>{room.description}</p>
                  <p>Min Booking Period: {room.minBookingPeriod} days</p>
                  <p>Max Booking Period: {room.maxBookingPeriod} days</p>
                  <p>Rent: ${room.rentAmount} per day</p>
                  <div className="room-images">
                    {room.photos.map((photo, index) => (
                      <img key={index} src={photo} alt="Room" />
                    ))}
                  </div>
                  <p>Number of Beds: {room.numberOfBeds}</p>
                  <button onClick={() => handleUpdate(room._id)}>Update</button>
                  <button onClick={() => handleDelete(room._id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No rooms available</p>
            )}
          </div>
        );
      case 'bookedRooms':
        return <div>Booked Rooms View</div>;
      case 'customerDetails':
        return <div>Customer Details View</div>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Your Properties</h1>
        <div className="dashboard-actions">
          <button className="dashboard-action-button" onClick={() => navigate('/add-room')}>
            <FontAwesomeIcon icon={faPlus} /> Add Room
          </button>
          <button className="dashboard-action-button" onClick={() => setView('rooms')}>
            <FontAwesomeIcon icon={faList} /> List Rooms
          </button>
          <button className="dashboard-action-button" onClick={() => setView('bookedRooms')}>
            <FontAwesomeIcon icon={faUsers} /> List Booked Rooms
          </button>
          <button className="dashboard-action-button" onClick={() => setView('customerDetails')}>
            <FontAwesomeIcon icon={faUsers} /> List Customers
          </button>
          <div className="dashboard-user" onClick={() => setShowLogout(!showLogout)}>
            <FontAwesomeIcon icon={faUser} /> {ownerName}
          </div>
          {showLogout && (
            <button className="dashboard-logout-button" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          )}
        </div>
      </header>
      <main className="dashboard-content">
        {renderView()}
      </main>
    </div>
  );
};

export default OwnerDashboard;
