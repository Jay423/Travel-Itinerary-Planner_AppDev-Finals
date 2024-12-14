import { useState } from 'react';
import axios from 'axios';
import './loginpage.css';
import logo from '../../assets/logoFinal.png';

function App() {
  const [formType, setFormType] = useState('login'); 
  const [data, setData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e, isRegister = false) => {
    if (isRegister) {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (formType === 'login') {
      if (!data.email || !data.password) {
        setError('Both fields are required!');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5001/routes/login', data);
        if (response.status === 200) {
          setData({ email: '', password: '' });
          setSuccess(response.data.message || 'Login successful!');
          window.location.href = '/plan';
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error connecting to the server.');
      }
    } else {
      if (!registerData.name || !registerData.email || !registerData.password) {
        setError('All fields are required!');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5001/routes/register', registerData);
        if (response.status === 201) {
          setRegisterData({ name: '', email: '', password: '' });
          setSuccess(response.data.message || 'Registration successful! Please log in.');
          setFormType('login');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error connecting to the server.');
      }
    }
  };

  return (
    <div className="loginback">
    <div className="login-page">
      <div className="form">
                <form onSubmit={handleSubmit}>
          {formType === 'login' ? (
            <>
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
            </>
          ) : (
            <>
              <h1>Register</h1>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={registerData.name}
                onChange={(e) => handleInputChange(e, true)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => handleInputChange(e, true)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => handleInputChange(e, true)}
                required
              />
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
              <button type="submit">Create</button>
              <p className="message">
                Already registered?{' '}
                <a href="#" onClick={() => setFormType('login')}>
                  Sign In
                </a>
              </p>
            </>
          )}
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
