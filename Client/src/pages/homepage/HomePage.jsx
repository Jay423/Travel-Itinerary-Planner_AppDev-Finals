import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          setError('No auth token found. Please log in.');
          window.location.href = '/login';
          return;
        }

        const response = await axios.get('http://localhost:5001/routes/home', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUser(response.data);
      } catch (error) {
        setError('Error fetching user profile.');
        window.location.href = '/login';
      }
    };

    getUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

    return (
        <div className="home-page">
           
            <nav className="navbar">
      <div className="navbar-left">
        <img src="/VISTALOGO.png" className='logo' alt="Your Logo" />
        <ul className="navbar-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/Itinerary">Itinerary</a></li>
          <li><a href="/Discover">Discover</a></li>
          <li><a href="/download-the-app">Download the app</a></li>
        </ul>
      </div>
      
      <div className="navbar-right">
        <span className='wcb'><p>Welcome back,</p>
        <div className='username'><p>Hanni Pham</p></div></span>
        <a onClick={handleLogout}>Log out</a>
        <button className="notification-button">
            <img src='/bell.png' className='bell' alt='bell'></img>
          <i className="fa fa-bell"></i>
          <span className="notification-count">10</span>
        </button>
      </div>
    </nav>

    <section className='MAP'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5550.585863553436!2d123.91697337622409!3d10.353324797527732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99894d1b6ae25%3A0xc2d9b9e99316c59d!2sUniversity%20of%20San%20Carlos%20-%20Talamban%20Campus!5e0!3m2!1sen!2sph!4v1733960894276!5m2!1sen!2sph" className='googlemap' border="4px black"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <button><a href='/calendar'>Plan a new trip +</a></button>
    </section>

    <section id="current-trips">
  <h2>Current Trips</h2>
  <a href='/'>
  <div className="trip-cardhome">
    <img src="/skorea.png" alt="South Korea"></img>
    <h4>Visiting South Korea Temples</h4>
    <span className='date'>Dec 29 - Dec 31</span>
  </div>
  </a>
  
  <a href='/'>
  <div className="trip-cardhome">
    <img src="/image.png" alt="Taking Friends to my Hometown"></img>
    <h4>Taking Friends to my Hometown</h4>
    <span className='date'>Jan 13 - Jan 20</span>
  </div></a>
  </section>

  <section id="discover">
  <h2>Discover</h2>
  <span className='destination'><p>Discover top destinations, curated based on popular choices by other travelers.</p></span>
  <div className="destination-card">
    <img src="/Madrid.png" alt="Madrid"></img>
    <h4>Madrid</h4>
    <button>View</button>
  </div>
  <div className="destination-card">
    <img src="/Kyoto.png" alt="Kyoto"></img>
    <h4>Kyoto</h4>
    <button>View</button>
  </div>
  </section>     
            <section className='footer'>
                <img src='/BotDisplay.png' alt='botdisp'></img>
            </section>
        </div>
    );
};

export default HomePage;
