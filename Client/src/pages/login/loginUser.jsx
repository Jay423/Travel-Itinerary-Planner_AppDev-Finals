import { useState } from 'react';
import axios from 'axios';
import './loginpage.css';
import logo from '../../assets/logoFinal.png';

function App() {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!data.email || !data.password) {
      setError('Both fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/routes/login', data);
      if (response.status === 200) {
        setData({ email: '', password: '' });
        setSuccess(response.data.message || 'Login successful!');
        window.location.href = '/home';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error connecting to the server.');
    }
  };

  return (
    <div className="loginback">
      <div className="login-page">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleInputChange}
              required
            />
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button type="submit">Login</button>
            <p className="message">
              Not registered?{' '}
              <a href="/register">
                Create an account
              </a>
            </p>
          </form>
        </div>
      </div>
      {/* <div className='logoimg'>
          <img src= {logo}></img>
        </div> */}
    </div>
  );
}

export default App;
