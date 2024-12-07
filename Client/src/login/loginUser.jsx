import { useState } from 'react';
import axios from 'axios';

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
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error connecting to the server.');
      setSuccess('');
    }
  };

  return (
    <div className="register_container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit">Login</button>

        <p>
          Already have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
}

export default App;
