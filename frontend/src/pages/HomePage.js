import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import '../styling/HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  // Array of photo URLs in the public directory
  const roomPhotos = [
    '/photos/background1.jpg',
    '/photos/background2.jpg',
    '/photos/background3.jpg',
    '/photos/background4.jpg'
  ];

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-page">
      <header className="nav-bar">
        <div className="title">
          <span className="app-name">HavenVibe</span>
        </div>
        <nav className="nav-links">
          <Link to="/register"><i className="person-icon">👤</i> Register</Link>
        </nav>
      </header>
      <main>
        <section className="intro">
          <h1>Welcome to HavenVibe</h1>
          <p>Your perfect stay starts here. Browse our collection of available rooms and find the one that suits you best.</p>
          <Link to="/login" className="explore-btn">Explore Rooms</Link>
        </section>
        <section className="photo-gallery">
          <h2>Room Highlights</h2>
          <Slider {...settings}>
            {roomPhotos.map((photo, index) => (
              <div key={index} className="slide">
                <img src={photo} alt={`Room ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
