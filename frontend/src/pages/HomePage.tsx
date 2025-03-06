import React from "react";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DiscountCarousel from "../components/DiscountCarousel/DiscountCarousel";
import PopularFoodCarousel from "../components/PopularFoodCarousel/PopularFoodCarousel";
import springRoll from "../assets/springrolls.jpg";
import dongpoPork from "../assets/dongpopork.jpg";
import spicyNoodles from "../assets/SpicyNoodles.jpg";
import grilledChicken from "../assets/GrilledChicken.jpg";
import freshSalad from "../assets/FreshSalad.jpg";
import FindUsOnline from "../components/FindUsOnline/FindUsOnline";
import Contact from "../components/Contact/Contact";

const HomePage: React.FC = () => {
  const discountItems = [
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

  const popularItems = [
    {
      id: 1,
      image: spicyNoodles, // 可替换为热门餐品图片
      title: 'Spicy Noodles'
    },
    {
      id: 2,
      image: grilledChicken, // 可替换为热门餐品图片
      title: 'Grilled Chicken'
    },
    {
      id: 3,
      image: freshSalad, // 可替换为热门餐品图片
      title: 'Fresh Salad'
    },
  ];

  return (
    <div>
      <header>
        <Navbar />
        <h1>""</h1>
      </header>
      <section style={{ margin: "2rem 0" }}>
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
