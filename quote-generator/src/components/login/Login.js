import React, { useState } from "react";
import { login } from "../../services/api";
import "./Login.css";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [apiError, setApiError] = useState("");

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (value.length > 0 && value.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
    } else {
      setUsernameError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameError) return;
    try {
      const data = await login(username, otp);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      setToken(data.token);
    } catch (error) {
      setApiError("Invalid OTP. Please enter the correct one.");
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          required
          className="login-input"
        />
        {usernameError && <p className="error-text">{usernameError}</p>}
        {username && (
          <input
            type="password"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="login-input otp-input"
          />
        )}
        {apiError && <p className="error-text">{apiError}</p>}{" "}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
