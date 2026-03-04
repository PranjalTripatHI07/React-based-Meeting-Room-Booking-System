import React from 'react';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import { useBookings } from './hooks/useBookings';
import './App.css';

export default function App() {
  const { bookings, addBooking, deleteBooking, ROOMS } = useBookings();

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="main-grid">
          <BookingForm rooms={ROOMS} onSubmit={addBooking} />
          <BookingList bookings={bookings} rooms={ROOMS} onDelete={deleteBooking} />
        </div>
      </main>
    </div>
  );
}
