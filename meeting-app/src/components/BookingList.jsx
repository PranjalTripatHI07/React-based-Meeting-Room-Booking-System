import React from 'react';

function formatTime(time24) {
  const [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BookingList({ bookings, rooms, onDelete }) {
  if (bookings.length === 0) {
    return (
      <div className="card booking-list-card">
        <div className="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <h2>Upcoming Bookings</h2>
        </div>
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="#DADCE0" strokeWidth="2" strokeDasharray="6 4" />
            <rect x="20" y="22" width="24" height="20" rx="3" stroke="#DADCE0" strokeWidth="2" />
            <line x1="26" y1="18" x2="26" y2="26" stroke="#DADCE0" strokeWidth="2" strokeLinecap="round" />
            <line x1="38" y1="18" x2="38" y2="26" stroke="#DADCE0" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="30" x2="44" y2="30" stroke="#DADCE0" strokeWidth="2" />
          </svg>
          <p>No bookings yet</p>
          <span>Create your first booking using the form</span>
        </div>
      </div>
    );
  }

  // Sort bookings by date, then start time
  const sorted = [...bookings].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="card booking-list-card">
      <div className="card-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <h2>Upcoming Bookings</h2>
        <span className="badge">{bookings.length}</span>
      </div>

      <div className="booking-list">
        {sorted.map((booking) => {
          const room = rooms.find((r) => r.id === booking.room);
          return (
            <div key={booking.id} className="booking-item">
              <div
                className="booking-color-bar"
                style={{ backgroundColor: room?.color || '#4285F4' }}
              />
              <div className="booking-info">
                <div className="booking-room">{room?.name || booking.room}</div>
                <div className="booking-details">
                  <span className="booking-date">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#5F6368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="2" width="12" height="11" rx="1.5" />
                      <line x1="4" y1="0.5" x2="4" y2="3.5" />
                      <line x1="10" y1="0.5" x2="10" y2="3.5" />
                      <line x1="1" y1="5.5" x2="13" y2="5.5" />
                    </svg>
                    {formatDate(booking.date)}
                  </span>
                  <span className="booking-time">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#5F6368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="7" cy="7" r="6" />
                      <polyline points="7 3.5 7 7 9.5 8.5" />
                    </svg>
                    {formatTime(booking.startTime)} – {formatTime(booking.endTime)}
                  </span>
                </div>
              </div>
              <button
                className="btn-delete"
                onClick={() => onDelete(booking.id)}
                title="Cancel booking"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 5 5 5 15 5" />
                  <path d="M6 5V3.5C6 3.22386 6.22386 3 6.5 3H11.5C11.7761 3 12 3.22386 12 3.5V5" />
                  <path d="M13.5 5V14.5C13.5 14.7761 13.2761 15 13 15H5C4.72386 15 4.5 14.7761 4.5 14.5V5" />
                  <line x1="7.5" y1="8" x2="7.5" y2="12" />
                  <line x1="10.5" y1="8" x2="10.5" y2="12" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
