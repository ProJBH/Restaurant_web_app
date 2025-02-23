// src/pages/HomePage.tsx
import React from "react";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const HomePage: React.FC = () => {
  return (
    <div>
      <header>
        <Navbar />
        <h1>Welcome to Our Restaurant</h1>
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
