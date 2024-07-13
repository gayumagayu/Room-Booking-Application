
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import '../styling/CustomerDashboard.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomerDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }
      const response = await axios.get('http://localhost:5000/api/rooms/available', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleRoomClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="dashboard-container">
      <h1>Available Rooms</h1>
      {error && <p className="error">Error: {error}</p>}
      {rooms.length > 0 ? (
        <div className="room-list">
          {rooms.map(room => (
            <div key={room._id} className="room-box" onClick={() => handleRoomClick(room._id)}>
              <h2 className="room-name">{room.name}</h2>
              <Slider {...settings}>
                {room.photos.map((photo, index) => (
                  <div key={index}>
                    <img src={`http://localhost:5000/${photo}`} alt={`Room ${room.name}`} />
                  </div>
                ))}
              </Slider>
            </div>
          ))}
        </div>
      ) : (
        <p>No rooms available</p>
      )}
    </div>
  );
};

export default CustomerDashboard;

