import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#4285F4" />
            <path
              d="M10 12C10 10.8954 10.8954 10 12 10H20C21.1046 10 22 10.8954 22 12V20C22 21.1046 21.1046 22 20 22H12C10.8954 22 10 21.1046 10 20V12Z"
              fill="white"
            />
            <path d="M22 14L26 11V21L22 18V14Z" fill="white" />
          </svg>
          <h1 className="header-title">Meeting Room Booking</h1>
        </div>
        <p className="header-subtitle">Book your meeting rooms quickly and easily</p>
      </div>
    </header>
  );
}
