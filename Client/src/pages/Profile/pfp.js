import React, { useState } from 'react';
import './pfp.css'

function UserProfile() {
    const [profileImage, setProfileImage] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@gmail.com');
    const [number, setNumber] = useState('123456789');
    const [birthday, setBirthday] = useState('2069-06-09');
    const [gender, setGender] = useState('male');
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
  
      reader.readAsDataURL(file);
    };
  
    const handleEditClick = () => {
      setIsEdit(!isEdit); // Toggle edit mode
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
  
      switch (name) {
        case 'name':
          setName(value);
          break;
        case 'email':
          setEmail(value);
          break;
        case 'number':
          setNumber(value);
          break;
        case 'birthday':
          setBirthday(value);
          break;
        case 'gender':
          setGender(value);
          break;
        default:
          break;
      }
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


        <div className="profile-container">
        <div className="profile-image-container">
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <div className="image-placeholder">
              {(profileImage === null) && <p>Click to Upload</p>}
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          )}
        </div>
  
        <div className="profile-info">
          <h2>{isEdit ? <input type="text" name="name" value={name} onChange={handleInputChange} /> : name}</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            {isEdit ? (
              <input type="email" id="email" name="email" value={email} onChange={handleInputChange} />
            ) : (
              <p>{email}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="number">Number:</label>
            {isEdit ? (
              <input type="text" id="number" name="number" value={number} onChange={handleInputChange} />
            ) : (
              <p>{number}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday:</label>
            {isEdit ? (
              <input type="date" id="birthday" name="birthday" value={birthday} onChange={handleInputChange} />
            ) : (
              <p>{birthday}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            {isEdit ? (
              <select id="gender" name="gender" value={gender} onChange={handleInputChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p>{gender}</p>
            )}
          </div>
          <button onClick={handleEditClick}>{isEdit ? 'Save' : 'Edit'}</button>
          <button>Reset Password</button>
          <button>Logout</button>
        </div>
      </div>
      </div>
    );
  }

export default UserProfile;
