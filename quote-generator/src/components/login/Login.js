import React, { useState, useRef } from "react";
import { login } from "../../services/api";
import "./Login.css";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]); // Store each OTP digit
  const [usernameError, setUsernameError] = useState("");
  const [apiError, setApiError] = useState("");

  const inputRefs = useRef([]);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (value.length > 0 && value.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
    } else {
      setUsernameError("");
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];

    // Allow only single character input
    if (value.length > 1) {
      value = value.charAt(0);
    }

    // Update the OTP array
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if a digit is entered and it's not the last box
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // Handle backspace to clear the current input and move to the previous one
    if (!value) {
      if (index > 0) {
        inputRefs.current[index - 1].focus(); // Focus on the previous input
      }
    }
  };

  const handleKeyDown = (index, event) => {
    // Handle backspace key for the current input
    if (event.key === "Backspace" && !otp[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameError) return;

    const otpString = otp.join(""); // Convert the array to a string
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
