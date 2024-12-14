import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './calendar.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function CalendarHeader({ 
  isYearView, 
  currentDate, 
  handlePrevMonth, 
  handleNextMonth, 
  handlePrevYear, 
  handleNextYear 
}) {
  const formattedDate = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar-header">
      {isYearView ? (
        <>
          <button onClick={handlePrevYear}>Prev Year</button>
          <span>{currentDate.getFullYear()}</span>
          <button onClick={handleNextYear}>Next Year</button>
        </>
      ) : (
        <>
          <button onClick={handlePrevMonth}>Prev</button>
          <span>{formattedDate}</span>
          <button onClick={handleNextMonth}>Next</button>
        </>
      )}
    </div>
  );
}

function TripCard({ date, title, location, createdBy }) {
  return (
    <div className="trip-card">
      <div className="trip-header">
        <span>{date}</span>
        <button className="edit-button">EDIT</button>
      </div>
      <h3>{title}</h3>
      <p>{location}</p>
      <div className="trip-footer">
        <span>Made by <img src={createdBy.profileImage} alt={createdBy.name} className="profile-icon" /></span>
        <button className="see-note-button">See Note</button>
      </div>
    </div>
  );
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isYearView, setIsYearView] = useState(false);
  const [tripData, setTripData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTripData = localStorage.getItem('tripData');
    if (storedTripData) {
      setTripData(JSON.parse(storedTripData));
    }
  }, []);

  const handleCreateTrip = () => {
    navigate('/tripplanner');
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)); 
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const toggleView = () => {
    setIsYearView(!isYearView);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const daysInPrevMonth = firstDayOfMonth.getDay();
    const daysInNextMonth = 7 - lastDayOfMonth.getDay();

    const days = [];
    for (let i = 0; i < daysInPrevMonth; i++) {
      days.push(<div key={`prev-${i}`} className="prev-month-day"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(<div key={i} className="day">{i}</div>);
    }

    for (let i = 1; i <= daysInNextMonth; i++) {
      days.push(<div key={`next-${i}`} className="next-month-day"></div>);
    }

    return days;
  };

  const renderYearView = () => {
    const currentYear = currentDate.getFullYear();

    return (
      <div className="year-view">
        {months.map((month, monthIndex) => {
          const firstDayOfMonth = new Date(currentYear, monthIndex, 1);
          const lastDayOfMonth = new Date(currentYear, monthIndex + 1, 0);
          const daysInMonth = lastDayOfMonth.getDate();

          const monthDays = [];
          const firstDayOfWeek = firstDayOfMonth.getDay(); 

          for (let i = 0; i < firstDayOfWeek; i++) {
            monthDays.push(<div key={`empty-${i}`} className="empty-day"></div>);
          }

          for (let i = 1; i <= daysInMonth; i++) {
            monthDays.push(<div key={i} className="day">{i}</div>);
          }

          while (monthDays.length < 7) { 
            monthDays.push(<div key={`empty-${monthDays.length}`} className="empty-day"></div>);
          } 

          return (
            <div key={month} className="month-container">
              <h2>{month}</h2> 
              <div className="week-header"> 
                {daysOfWeek.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="month-days">
                {monthDays}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const upcomingTrips = [
    { 
      date: 'July 6 - 9', 
      title: 'Birthday', 
      location: 'Berlin, Germany', 
      createdBy: { 
        name: 'John Doe', 
        profileImage: '/path/to/profile-image.jpg' 
      } 
    },
    { 
      date: 'Nov 28 - Oct 5', 
      title: 'Trip across Europe', 
      location: 'Paris, France', 
      createdBy: { 
        name: 'Jane Doe', 
        profileImage: '/path/to/profile-image.jpg' 
      } 
    },
    // Add more trip objects as needed
  ];


  return (
    <div className='calendarapp'>

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

      <button onClick={toggleView}>{isYearView ? 'Month View' : 'Year View'}</button> 

      <div className="container">
        <div className="calendar">
          <CalendarHeader 
            isYearView={isYearView} 
            currentDate={currentDate} 
            handlePrevMonth={handlePrevMonth} 
            handleNextMonth={handleNextMonth} 
            handlePrevYear={handlePrevYear} 
            handleNextYear={handleNextYear} 
          />
          {/* Remove the week-header in year view */}
          {isYearView ? (
            <div className="year-view-container"> 
              {renderYearView()} 
            </div>
          ) : (
            <>
              <div className="week-header">
                {daysOfWeek.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="days-grid">
                {renderCalendar()} 
              </div>
            </>
          )} 
          
        </div>
        <div className="upcoming-trips">
          <h2>UPCOMING TRIPS</h2>
          {tripData && (
            <TripCard 
              date={`${tripData.departureDate} - ${tripData.arrivalDate}`} 
              title={tripData.title} 
              location={`${tripData.destinationCity}, ${tripData.destinationCountry}`} 
              createdBy={{ name: 'Hanni Pham', profileImage: '/path/to/profile-image.jpg' }} 
            />
          )}
          <button className="create-trip-button" onClick={handleCreateTrip}>+ Create Trip</button> 
        </div>
      </div>
    </div>
  );
}

export default Calendar;
