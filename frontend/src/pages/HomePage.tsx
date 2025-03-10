import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DiscountCarousel from "../components/DiscountCarousel/DiscountCarousel";
import PopularFoodCarousel from "../components/PopularFoodCarousel/PopularFoodCarousel";
import FindUsOnline from "../components/FindUsOnline/FindUsOnline";
import Contact from "../components/Contact/Contact";

const HomePage: React.FC = () => {
  const discountItems = [
    {
      id: 1,
      image: "/assets/SpringRoll.jpg",
      discount: '50% OFF',
      title: 'Spring Rolls',
      originalPrice: 98,
      discountedPrice: 49,
      timeLimit: '12:34:56'
    },
    {
      id: 2,
      image: "assets/DongpoPork.jpg",
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

  const popularItems = [
    {
      id: 1,
      image: "/assets/SpicyNoodles.jpg",
      title: 'Spicy Noodles'
    },
    {
      id: 2,
      image: "/assets/GrilledChicken.jpg",
      title: 'Grilled Chicken'
    },
    {
      id: 3,
      image: "/assets/FreshSalad.jpg",
      title: 'Fresh Salad'
    },
  ];

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <section style={{ marginTop: "4.5rem" }}>
        <DiscountCarousel 
          items={discountItems}
          autoPlayInterval={5000}
        />
      </section>
      <section style={{ margin: "2rem 0" }}>
        <PopularFoodCarousel
          mainFlavors="我们的招牌风味：传统中餐的精髓与现代创新的完美融合"
          carouselItems={popularItems}
          autoPlayInterval={5000}
        />
      </section>
      <section style={{ margin: "2rem 0" }}>
      <FindUsOnline /> 
      </section>
      <section style={{ margin: "2rem 0" }}>
        <Contact />
      </section>
    </div>
  );
};

export default HomePage;
