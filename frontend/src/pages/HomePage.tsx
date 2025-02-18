// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Welcome to Our Restaurant</h1>
        <nav>
          <Link to="/menu">Menu</Link> | <Link to="/booking">Book a Table</Link> | <Link to="/admin/login">Admin</Link>
        </nav>
      </header>
      <section>
        <h2>Advertisement</h2>
        <p>Enjoy our delicious meals!</p>
      </section>
      {/* Add more static sections as needed */}
    </div>
  );
};

export default HomePage;
