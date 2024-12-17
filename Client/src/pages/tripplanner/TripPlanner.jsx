import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TripPlanner.css'; // Import the CSS file
import CityCountryAutocomplete from './CityAutocomplete';

function TripPlanner() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState('');
  const [tripData, setTripData] = useState({
    from: '',
    to: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    title: '',
    destinationCountry: '',
    destinationCity: '',
    activities: [],
    notes: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No auth token found. Please log in.');
        window.location.href = '/login';
        return;
      }

      try {
        const response = await axios.get('http://localhost:5001/routes/trip', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTrips(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching events.');
        window.location.href = '/login';
      }
    };

    fetchTrips();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleActivityChange = (index, event) => {
    const { name, value } = event.target;
    const newActivities = [...tripData.activities];
    newActivities[index][name] = value;
    setTripData({ ...tripData, activities: newActivities });
  };

  const addActivity = () => {
    setTripData({
      ...tripData,
      activities: [...tripData.activities, { name: '', place: '', date: '', timeStart: '', timeEnd: '', description: '' }],
    });
  };

  const handleCountrySelect = (country) => {
    setTripData({ ...tripData, destinationCountry: country });
  };

  const handleCitySelect = (city) => {
    setTripData({ ...tripData, destinationCity: city });
  };

  useEffect(() => {
    if (tripData.departureDate) {
      const date = new Date(tripData.departureDate);
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      const fromValue = `${month} ${day}`;
      setTripData((prevData) => ({ ...prevData, from: fromValue }));
    }
  }, [tripData.departureDate]);

  useEffect(() => {
    if (tripData.arrivalDate) {
      const date = new Date(tripData.arrivalDate);
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      const toValue = `${month} ${day}`;
      setTripData((prevData) => ({ ...prevData, to: toValue }));
    }
  }, [tripData.arrivalDate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5001/routes/trip', tripData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Trip created:', response.data);
      navigate('/calendar'); // Navigate back to the calendar page
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  const handleClick = () => {
    if (!tripData.from || !tripData.to || !tripData.departureDate || !tripData.departureTime || !tripData.arrivalDate || !tripData.arrivalTime || !tripData.title || !tripData.destinationCountry || !tripData.destinationCity) {
      setError('All required fields must be provided.');
    } else {
      handleSubmit();
    }
  };

  return (
    <div>
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
        <a href='/'>Log out</a>
        <button className="notification-button">
            <img src='/bell.png' className='bell' alt='bell'></img>
          <i className="fa fa-bell"></i>
          <span className="notification-count">10</span>
        </button>
      </div>
    </nav>


      <div className="container">
      <div className="trip-planner">
      <form onSubmit={handleSubmit}>
        <div className="date-boxes">
          <div className="date-box">
            <label>From</label>
            <input type="text" name="from" value={tripData.from} onChange={handleChange} placeholder="From" />
            <input type="date" name="departureDate" value={tripData.departureDate} onChange={handleChange} />
            <input type="time" name="departureTime" value={tripData.departureTime} onChange={handleChange} />
          </div>
          <div className="date-box">
            <label>To</label>
            <input type="text" name="to" value={tripData.to} onChange={handleChange} placeholder="To" />
            <input type="date" name="arrivalDate" value={tripData.arrivalDate} onChange={handleChange} />
            <input type="time" name="arrivalTime" value={tripData.arrivalTime} onChange={handleChange} />
          </div>
        </div>

        <input type="text" name="title" placeholder="Title" value={tripData.title} onChange={handleChange} className='titlebox'/>

        <div className="destination-boxes">
        <CityCountryAutocomplete onCountrySelect={handleCountrySelect} onCitySelect={handleCitySelect} />
        
        </div>

        <div className="activity-container">
          {tripData.activities.map((activity, index) => (
            <div className="activity" key={index}>
              <input type="text" name="name" placeholder="Name" value={activity.name} onChange={(e) => handleActivityChange(index, e)} />
              <input type="text" name="place" placeholder="Place" value={activity.place} onChange={(e) => handleActivityChange(index, e)} />
              <input type="date" name="date" value={activity.date} onChange={(e) => handleActivityChange(index, e)} />
              <div className="time-inputs">
    <input type="time" name="timeStart" value={activity.timeStart} onChange={(e) => handleActivityChange(index, e)} />
              <p className='to'>To</p>
    <input type="time" name="timeEnd" value={activity.timeEnd} onChange={(e) => handleActivityChange(index, e)} />
  </div>
              <textarea name="description" placeholder="Description" value={activity.description} onChange={(e) => handleActivityChange(index, e)} />
            </div>
          ))}
          <button type="button" onClick={addActivity}>Add Activity +</button>
        </div>

        <div className="notes-container">
  <textarea name="notes" placeholder="Notes" value={tripData.notes} onChange={handleChange} />
</div>
<button type="button" onClick={handleClick}>Create Trip</button>
      </form>
        </div>
    </div>
    </div>
  );
}

export default TripPlanner;
