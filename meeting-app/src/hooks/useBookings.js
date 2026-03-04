import { useState, useCallback } from 'react';

let idCounter = 0;

const ROOMS = [
  { id: 'room-a', name: 'Conference Room A', color: '#4285F4' },
  { id: 'room-b', name: 'Meeting Room B', color: '#34A853' },
  { id: 'room-c', name: 'Board Room C', color: '#EA4335' },
];

export function useBookings() {
  const [bookings, setBookings] = useState([]);

  const validateBooking = useCallback(
    (newBooking) => {
      const { room, date, startTime, endTime } = newBooking;

      // Check all fields are filled
      if (!room || !date || !startTime || !endTime) {
        return { valid: false, error: 'Please fill in all fields before submitting.' };
      }

      // Validate time range
      if (startTime >= endTime) {
        return {
          valid: false,
          error: 'Start time must be earlier than end time. Please adjust your time selection.',
        };
      }

      // Check for overlapping bookings in the same room on the same date
      const overlap = bookings.find(
        (b) =>
          b.room === room &&
          b.date === date &&
          startTime < b.endTime &&
          endTime > b.startTime
      );

      if (overlap) {
        const roomName = ROOMS.find((r) => r.id === room)?.name || room;
        return {
          valid: false,
          error: `Time conflict: "${roomName}" is already booked on ${date} from ${overlap.startTime} to ${overlap.endTime}. Please choose a different time or room.`,
        };
      }

      return { valid: true, error: null };
    },
    [bookings]
  );

  const addBooking = useCallback(
    (newBooking) => {
      const result = validateBooking(newBooking);
      if (result.valid) {
        idCounter += 1;
        setBookings((prev) => [
          ...prev,
          { ...newBooking, id: `booking-${Date.now()}-${idCounter}` },
        ]);
      }
      return result;
    },
    [validateBooking]
  );

  const deleteBooking = useCallback((id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { bookings, addBooking, deleteBooking, ROOMS };
}
