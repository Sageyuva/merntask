import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password === "admin") {
      alert("Login Success");
      navigate("/home");
      localStorage.setItem("user", email);
    } else {
      alert("Incorrect credentials");
      window.location.reload();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useState(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="text">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
