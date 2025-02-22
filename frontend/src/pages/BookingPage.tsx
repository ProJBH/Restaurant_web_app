// src/pages/BookingPage.tsx
import React, { useState } from 'react';

const BookingPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '', guests: 1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, simply log the data. Later, connect to a backend endpoint.
    console.log(form);
  };

  return (
    <div>
      <h1>Book a Table</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="time" type="time" value={form.time} onChange={handleChange} required />
        <input name="guests" type="number" min="1" value={form.guests} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingPage;
