import React, { useState } from 'react';
import './pfp.css';

function UserProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfileImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const resetProfileImage = () => {
    setProfileImage(null);
  };

  const handleEditClick = () => {
    setIsEdit(!isEdit);
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
          <img src="/VISTALOGO.png" className="logo" alt="Your Logo" />
          <ul className="navbar-links">
            <li><a href="/">Home</a></li>
            <li><a href="/Itinerary">Itinerary</a></li>
            <li><a href="/Discover">Discover</a></li>
            <li><a href="/download-the-app">Download the App</a></li>
          </ul>
        </div>
        <div className="navbar-right">
          <span className="wcb">
            <p>Welcome back,</p>
            <div className="username"><p>Hanni Pham</p></div>
          </span>
          <a href="/">Log out</a>
          <button className="notification-button">
            <img src="/bell.png" className="bell" alt="bell" />
            <span className="notification-count">10</span>
          </button>
        </div>
      </nav>

      <div className="profile-container">
      <div className="profile-image-wrapper">
  <div className="profile-image-container">
    {profileImage ? (
      <img src={profileImage} alt="Profile" />
    ) : (
      <div className="image-placeholder">
        <p>Click to Upload</p>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
    )}
  </div>
  <button onClick={resetProfileImage} className="reset-image-button">
    Reset Image
  </button>
</div>



        <div className="profile-info">
        <div className="form-group">
  <label htmlFor="name">Name:</label>
  {isEdit ? (
    <input
      type="text"
      id="name"
      name="name"
      value={name}
      onChange={handleInputChange}
      placeholder="Enter your name"
    />
  ) : (
    <p>{name}</p>
  )}
</div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            {isEdit ? (
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                 placeholder="Enter your email"
              />
            ) : (
              <p>{email}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="number">Number:</label>
            {isEdit ? (
              <input
                type="text"
                id="number"
                name="number"
                value={number}
                onChange={handleInputChange}
                 placeholder="Enter your number"
              />
            ) : (
              <p>{number}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="birthday">Birthday:</label>
            {isEdit ? (
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={birthday}
                onChange={handleInputChange}
              />
            ) : (
              <p>{birthday}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            {isEdit ? (
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p>{gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
            )}
          </div>

          <div className="button-group">
            <button onClick={handleEditClick}>
              {isEdit ? 'Save' : 'Edit'}
            </button>
            <button>Reset Password</button>
            <button>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
