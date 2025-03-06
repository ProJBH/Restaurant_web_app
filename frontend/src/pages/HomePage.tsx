// src/pages/HomePage.tsx
import React from "react";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DiscountCarousel from "../components/DiscountCarousel/DiscountCarousel";
import springRoll from "../assets/springrolls.jpg";
import dongpoPork from "../assets/dongpopork.jpg";

const HomePage: React.FC = () => {
  const carouselItems = [
    {
      id: 1,
      image: springRoll,
      discount: '50% OFF',
      title: 'Spring Rolls',
      originalPrice: 98,
      discountedPrice: 49,
      timeLimit: '12:34:56'
    },
    {
      id: 2,
      image: dongpoPork,
      discount: '30% OFF',
      title: 'Dongpo Pork',
      originalPrice: 88,
      discountedPrice: 61,
    },
    {
      id: 3,
      image: 'discount3.jpg',
      discount: '40% OFF',
      title: 'Dish 3',
      originalPrice: 108,
      discountedPrice: 65,
    },
  ];
  return (
    <div>
      <header>
        <Navbar />
        <h1>Welcome to Our Restaurant</h1>
      </header>
      <section>
        <DiscountCarousel 
        items={carouselItems}
        autoPlayInterval={5000}/>
      </section>
      <section>
        <h2>Advertisement</h2>
        <p>Enjoy our delicious meals!</p>
      </section>
      {/* Add more static sections as needed */}
    </div>
  );
};

export default HomePage;
