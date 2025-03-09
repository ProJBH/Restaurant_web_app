import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Booking.module.scss";

const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    date: "",
    people: 1,
    time: "",
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 可在此处处理提交逻辑，例如调用 API 接口
    console.log("Booking submitted:", formData);
  };

  return (
    <div className={styles.booking}>
      <div className={styles.bookingContainer}>
        <h1 className={styles.title}>Book a Table</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="people" className="form-label">Number of People</label>
            <input
              type="number"
              className="form-control"
              id="people"
              name="people"
              value={formData.people}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Comment</label>
            <textarea
              className="form-control"
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={3}
              placeholder="Optional comment"
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit Booking</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
