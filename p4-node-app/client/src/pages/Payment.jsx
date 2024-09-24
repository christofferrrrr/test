import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [formData, setFormData] = useState({
    bookingid: '',
    amount: '',
    paymentmethod: 'creditcard', // default option
    status: 'pending', // default status
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/payments', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Payment successful');
    } catch (error) {
      alert('Payment failed');
    }
  };

  return (
    <div>
      <h2>Select Payment Method</h2>
      <form onSubmit={handlePayment}>
        <input
          type="text"
          name="bookingid"
          placeholder="Booking ID"
          value={formData.bookingid}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <select name="paymentmethod" value={formData.paymentmethod} onChange={handleChange} required>
          <option value="creditcard">Credit Card</option>
          <option value="debitcard">Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>
        <input
          type="hidden"
          name="status"
          value={formData.status}
        />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default Payment;
