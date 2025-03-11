import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DiscountCarousel from "../components/DiscountCarousel/DiscountCarousel";
import PopularFoodCarousel from "../components/PopularFoodCarousel/PopularFoodCarousel";
import FindUsOnline from "../components/FindUsOnline/FindUsOnline";
import Contact from "../components/Contact/Contact";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: string; // Original price as string
  allergy: string;
  description: string;
  popular: number;
  sale: number;
  createtime: string;
  lastedittime: string;
  imageurl: string | null;
  ingredients: string;
  discount_percentage: number;
  disable?: number;
  originalPrice: number; // Computed discounted price
  timeLimit?: string; // Optional time limit
}

const HomePage: React.FC = () => {
  const [discountItems, setDiscountItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const popularItems = [
    {
      id: 1,
      image: "/assets/SpicyNoodles.jpg",
      title: "Spicy Noodles",
    },
    {
      id: 2,
      image: "/assets/GrilledChicken.jpg",
      title: "Grilled Chicken",
    },
    {
      id: 3,
      image: "/assets/FreshSalad.jpg",
      title: "Fresh Salad",
    },
  ];

  useEffect(() => {
    axios.get("/api/menu")
      .then((response) => {
        const data = response.data;
        if (!Array.isArray(data)) {
          setError("Invalid data format");
          setLoading(false);
          return;
        }
        // Filter items where sale equals 1
        const saleItems = data.filter((item: any) => item.sale === 1);
        const items = saleItems.map((item: any) => {
          const discountPercentage = parseFloat(item.discount_percentage);
          const originalPrice = Math.round(parseFloat(item.price) / (1 - discountPercentage / 100));
          return {
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            allergy: item.allergy,
            description: item.description,
            popular: item.popular,
            sale: item.sale,
            createtime: item.createtime,
            lastedittime: item.lastedittime,
            imageurl: item.imageurl,
            ingredients: item.ingredients,
            discount_percentage: discountPercentage,
            disable: item.disable,
            originalPrice: originalPrice,
            timeLimit: item.timeLimit,
          };
        });
        setDiscountItems(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sale items", err);
        setError("Error fetching sale items");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <section style={{ marginTop: "4.5rem" }}>
        <DiscountCarousel items={discountItems} autoPlayInterval={2000} />
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
