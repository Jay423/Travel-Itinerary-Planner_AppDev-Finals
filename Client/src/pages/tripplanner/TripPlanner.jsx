import React, { useState } from 'react';
import './TripPlanner.css'; // Import the CSS file
import CityCountryAutocomplete from './CityAutocomplete'

function TripPlanner() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to server)
    console.log(tripData); // Log the trip data to the console
  };

  return (
    <div>
      <nav className="navbar">
      <div className="navbar-left">
        <img src="/VISTALOGO.png" className='logo' alt="Your Logo" />
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
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
            <input type="date" name="departureDate" value={tripData.departureDate} onChange={handleChange} />
            <input type="time" name="departureTime" value={tripData.departureTime} onChange={handleChange} />
          </div>
          <div className="date-box">
            <label>To</label>
            <input type="date" name="arrivalDate" value={tripData.arrivalDate} onChange={handleChange} />
            <input type="time" name="arrivalTime" value={tripData.arrivalTime} onChange={handleChange} />
          </div>
        </div>

        <input type="text" name="title" placeholder="Title" value={tripData.title} onChange={handleChange} className='titlebox'/>

        <div className="destination-boxes">
        <CityCountryAutocomplete />
        
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
<button type="submit">Create Trip</button>
      </form>
        </div>
    </div>
    </div>
  );
}

export default TripPlanner;
