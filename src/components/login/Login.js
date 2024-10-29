import React, { useState, useRef } from "react";
import { login } from "../../services/api";
import "./Login.css";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [usernameError, setUsernameError] = useState("");
  const [apiError, setApiError] = useState("");

  const inputRefs = useRef([]);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (value.length > 0 && value.length < 3) {
      setUsernameError("The username must be at least 3 characters long.");
    } else {
      setUsernameError("");
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];

    if (value.length > 1) {
      value = value.charAt(0);
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    if (!value) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameError) return;

    const otpString = otp.join("");
    try {
      const data = await login(username, otpString);
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

        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          required
          className="login-input"
        />
        {usernameError && <p className="error-text">{usernameError}</p>}

        {username && (
          <>
            <label className="label">Enter OTP</label>
            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  placeholder="-"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otp-input"
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              ))}
            </div>
          </>
        )}

        {apiError && <p className="error-text">{apiError}</p>}

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
