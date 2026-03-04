import React, { useState, useEffect, useRef } from 'react';

export default function BookingForm({ rooms, onSubmit }) {
  const [form, setForm] = useState({
    room: '',
    date: '',
    startTime: '',
    endTime: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = onSubmit(form);
    if (!result.valid) {
      setError(result.error);
    } else {
      setSuccess('Booking confirmed successfully!');
      setForm({ room: '', date: '', startTime: '', endTime: '' });
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setSuccess(''), 3000);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="card booking-form-card">
      <div className="card-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="12" y1="14" x2="12" y2="18" />
          <line x1="10" y1="16" x2="14" y2="16" />
        </svg>
        <h2>New Booking</h2>
      </div>

      {error && (
        <div className="alert alert-error">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="#D93025" strokeWidth="2" />
            <line x1="10" y1="6" x2="10" y2="11" stroke="#D93025" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="14" r="1" fill="#D93025" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="#34A853" strokeWidth="2" />
            <path d="M6 10L9 13L14 7" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="room">Meeting Room</label>
          <select
            id="room"
            name="room"
            value={form.room}
            onChange={handleChange}
            required
          >
            <option value="">Select a room...</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={today}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3V15M3 9H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Book Room
        </button>
      </form>
    </div>
  );
}
