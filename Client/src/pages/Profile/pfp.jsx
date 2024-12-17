import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pfp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function UserProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setError('No auth token found. Please log in.');
          window.location.href = '/login';
          return;
        }
        
        const response = await axios.get('http://localhost:5001/routes/pfp', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = response.data;
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
        setEmail(data.email || '');
        setNumber(data.number || '');
        setBirthday(data.birthday || '');
        setGender(data.gender || '');

      } catch (error) {
        setError('Error fetching user profile.');
        console.error('Error fetching user data:', error);
        window.location.href = '/login';
      }
    };

    fetchData();
  }, []);

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

  const handleEditClick = async () => {
    if (isEdit) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('No auth token found. Please log in.');
          window.location.href = '/login';
          return;
        }

        if (isPasswordReset) {

          const verifyResponse = await axios.post('http://localhost:5001/routes/verify-password', {
            currentPassword
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!verifyResponse.data.valid) {
            setError('Current password is incorrect.');

            setIsPasswordReset(false);
            setCurrentPassword('');
            setIsEdit(false);
            return;
          }

          if (!newPassword.trim()) {
            setError('New password cannot be empty.');
            setTimeout(() => setError(null), 1000); 
            return;
          }
        }

        const updatedUser = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          number: number,
          birthday: birthday,
          gender: gender,
          password: isPasswordReset && newPassword ? newPassword : undefined,
        };

        await axios.put('http://localhost:5001/routes/pfp', updatedUser, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('User profile updated successfully');
        setIsPasswordReset(false); 
        setCurrentPassword(''); 
        setNewPassword(''); 

      } catch (error) {

        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
          setTimeout(() => setError(null), 1000); 
        } else {
          setError('Error updating user profile.');
          setTimeout(() => setError(null), 1000); 
        }
        console.error('Error updating user data:', error);
      }

      setIsPasswordReset(false);
      setCurrentPassword('');
      setNewPassword('');
    }
    setIsEdit(!isEdit);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
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
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'currentPassword':
        setCurrentPassword(value);
        break;
      default:
        break;
    }
  };

  const handleResetPasswordClick = () => {
    setIsPasswordReset(true);
    setNewPassword('');
    setCurrentPassword('');
    setIsEdit(true); 
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
            <li><a href="/pfp">Profile</a></li>
          </ul>
        </div>
        <div className="navbar-right">
          <span className="wcb">
            <p>Welcome back,</p>
            <div className="username"><p>{firstName} {lastName}</p></div>
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
            <label htmlFor="firstName">First Name:</label>
            {isEdit ? (
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
              />
            ) : (
              <p>{firstName || "N/A"}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            {isEdit ? (
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
              />
            ) : (
              <p>{lastName || "N/A"}</p>
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
              <p>{email || "N/A"}</p>
            )}
          </div>
          {isPasswordReset && (
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={handleInputChange}
                placeholder="Enter your current password"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            {isEdit ? (
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleInputChange}
                placeholder="Enter your new password"
                disabled={!isPasswordReset}
              />
            ) : (
              <p>********</p>
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
              <p>{number || "N/A"}</p>
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
              <p>{birthday || "N/A"}</p>
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
              <option value="">Select Gender</option> 
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            ) : (
              <p>{gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : ''}</p>
            )}
          </div>
          <div className="button-group">
            <button onClick={handleEditClick}>
              {isEdit ? 'Save' : 'Edit'}
            </button>
            <button onClick={handleResetPasswordClick}>Reset Password</button>
            <button onClick={() => window.location.href = '/'}>Logout</button>
          </div>
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
