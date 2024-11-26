import { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      setError('Both fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/routes/register', data);
      alert(`Register Successful! Response: ${JSON.stringify(response.data)}`);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error connecting to the server.');
    }
  };

  return (
    <div className="register_container">
      <h1>Register</h1>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
