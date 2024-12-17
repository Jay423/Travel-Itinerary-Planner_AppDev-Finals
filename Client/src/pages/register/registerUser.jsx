import { useState } from 'react';
import axios from 'axios';
import '/src/pages/login/loginpage.css';
import logo from '../../assets/logoFinal.png';

function App() {
  const [data, setData] = useState({ email: '', password: '', first_name: '', last_name: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!data.email || !data.password || !data.first_name || !data.last_name) {
      setError('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/routes/register', data);

      if (response.status === 201) {
        setData({ email: '', password: '', first_name: '', last_name: '' }); 
        setSuccess(response.data.message || 'Registration successful!');
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error connecting to the server.');
      setSuccess('');
    }
  };

  return (
    <div className="loginback">
    <div className="login-page">
       <div className="form">
          <form onSubmit={handleSubmit}>
         
          <h1>Register</h1>
        
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleInputChange}
            required
          />
    
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="first_name"
            placeholder="Enter your First Name"
            value={data.first_name}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="last_name"
            placeholder="Enter your Last Name"
            value={data.last_name}
            onChange={handleInputChange}
            required
          />
        
        
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit">Register</button>

          <p className="message">
            Already have an account? <a href="/login">Login here</a>
          </p>
            
          </form>
        </div>
        </div>
     <div className='logoimg'>
              <img src= {logo}></img>
    
            </div>
    </div>
  );
}

export default App;
