import React from "react";
import "./toast.css";

const Toast = ({ message, onClose }) => {
  return (
    <div className="toast success-toast">
      <div className="toast-content">
        <span className="toast-icon">✅</span>
        <div className="toast-text w-full">
          <div className="flex justify-between">
            <h4 className="toast-heading">Success</h4>
            <button className="toast-close" onClick={onClose}>
              &times;
            </button>
          </div>
          <p className="success-message">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
