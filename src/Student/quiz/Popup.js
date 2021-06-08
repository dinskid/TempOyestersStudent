import React from 'react';

export default function Popup({ children, onClose }) {
  return (
    <div className="popup popup-overlay">
      <div className="shadow-box popup-content">
        {children || 'Please close this'}
      </div>
      <button
        className="close shadow-box"
        onClick={onClose}
      >
        <span>&times;</span>
      </button>
    </div>
  );
}