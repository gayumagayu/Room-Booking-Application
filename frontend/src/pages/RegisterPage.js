
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/RegisterPage.css'; // Import the CSS file
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, role, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        alert(data.message);
        navigate('/login'); // Redirect to login page on successful registration
      } else {
        console.error(data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="Customer">Customer</option>
            <option value="HouseOwner">HouseOwner</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          If you already have an account, <a href="/login">login here</a>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

