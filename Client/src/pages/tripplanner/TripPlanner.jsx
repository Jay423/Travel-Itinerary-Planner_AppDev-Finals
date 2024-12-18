import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './TripPlanner.css'; 
import CityCountryAutocomplete from './CityAutocomplete';

function TripPlanner() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();
  const isEditMode = location.state?.isEditMode || false;
  const tripId = location.state?.tripId || null;
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

  useEffect(() => {
    if (isEditMode && tripId) {
      const fetchTripData = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get(`http://localhost:5001/routes/trip/${tripId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const trip = response.data;
          setTripData({
            from: trip.from,
            to: trip.to,
            departureDate: trip.departureDate,
            departureTime: trip.departureTime,
            arrivalDate: trip.arrivalDate,
            arrivalTime: trip.arrivalTime,
            title: trip.title,
            destinationCountry: trip.destinationCountry,
            destinationCity: trip.destinationCity,
            activities: trip.Activities.map(activity => ({
              name: activity.activity_name,
              place: activity.venue,
              date: activity.date,
              timeStart: activity.time_start,
              timeEnd: activity.time_end,
              description: activity.activity_description,
            })),
            notes: trip.notes || '',
          });
        } catch (error) {
          console.error('Error fetching trip data:', error);
        }
      };
      fetchTripData();
    }
  }, [isEditMode, tripId]);

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

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`http://localhost:5001/routes/trip/${tripId}`, tripData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/calendar', { state: { shouldRefetch: true } });
    } catch (error) {
      console.error('Error saving trip:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5001/routes/trip/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/calendar', { state: { shouldRefetch: true } });
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

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
      navigate('/calendar', { state: { shouldRefetch: true } });
    } catch (error) {
      console.error('Error creating trip:', error);
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
            <li><a href="/pfp">Profile</a></li>
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
          {error && <div className="error-message">{error}</div>}
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
              <CityCountryAutocomplete 
                onCountrySelect={handleCountrySelect} 
                onCitySelect={handleCitySelect} 
                initialCountry={tripData.destinationCountry}
                initialCity={tripData.destinationCity}
              />
            </div>

            <div className="activity-container">
              {tripData.activities && tripData.activities.map((activity, index) => (
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
            {isEditMode ? (
              <div className="edit-buttons">
                <button type="button" onClick={handleSave}>Save</button>
                <button type="button" onClick={handleDelete}>Delete</button>
              </div>
            ) : (
              <button type="button" onClick={handleSubmit}>Create Trip</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default TripPlanner;
