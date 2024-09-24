import React, { useState } from 'react';
import axios from 'axios';

const Booking = () => {
  const [facility, setFacility] = useState('');
  const [date, setDate] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/bookings', { facility, date }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Booking successful');
    } catch (error) {
      alert('Booking failed');
    }
  };

  return (
    <div>
      <h2>Book a Facility</h2>
      <form onSubmit={handleBooking}>
        <input
          type="text"
          placeholder="Facility"
          value={facility}
          onChange={(e) => setFacility(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default Booking;
