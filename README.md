# React Meeting Room Booking System

A modern React-based meeting room booking system with a Google Meet-inspired UI. Book predefined rooms, view existing bookings, and receive meaningful error messages for time conflicts.

## Features

- **3 Predefined Rooms**: Conference Room A, Meeting Room B, Board Room C
- **Overlap Prevention**: Prevents double-booking the same room at overlapping times
- **Time Validation**: Ensures start time is earlier than end time
- **Meaningful Errors**: Specific error messages showing which room and time slot conflicts
- **Modern UI**: Clean, Google Workspace-inspired design with white & blue theme
- **Responsive**: Works on desktop, tablet, and mobile screens

## Getting Started

```bash
cd meeting-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- **React 19** – UI library
- **Vite** – Build tool and dev server
- **CSS** – Custom styles (no external UI framework)

## Project Structure

```
meeting-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Top navigation bar
│   │   ├── BookingForm.jsx    # Form to create new bookings
│   │   └── BookingList.jsx    # Display existing bookings
│   ├── hooks/
│   │   └── useBookings.js     # Booking state & validation logic
│   ├── App.jsx                # Main app layout
│   ├── App.css                # Application styles
│   ├── index.css              # Global reset & variables
│   └── main.jsx               # Entry point
├── index.html
├── package.json
└── vite.config.js
```
