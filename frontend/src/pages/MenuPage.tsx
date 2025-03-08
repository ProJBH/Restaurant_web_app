// src/pages/MenuPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

// 定义 MenuItem 接口，包含数据库 menu 表的所有列
interface MenuItem {
  id: number;
  name: string;
  category: string; // 枚举值：starter, main, drink, dessert
  price: number;
  allergy: string;
  description: string;
  popular: number; // 0 或 1
  sale: number;    // 0 或 1
  createtime: string;
  lastedittime: string;
  imageurl: string | null;
  ingredients: string;
  discount_percentage: number;
}

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // 调用后端接口获取数据
    axios.get("/api/menu")
      .then(response => {
        console.log("Menu data:", response.data);
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  // 根据 category (忽略大小写)分组
  const groupedItems = menuItems.reduce((acc: { [key: string]: MenuItem[] }, item) => {
    const cat = item.category.toLowerCase();
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(item);
    return acc;
  }, {});

  // 定义显示的子目录顺序
  const categoriesOrder = ["starter", "main", "drink", "dessert"];

  const handleItemClick = (item: MenuItem) => {
    // 点击事件，目前仅打印日志
    console.log(`Clicked on ${item.name}`);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Menu</h1>
      {categoriesOrder.map((cat) => (
        <section key={cat} className="mb-3">
          <h2>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>
          <ul className="list-group">
            {groupedItems[cat] && groupedItems[cat].map(item => (
              <li
                key={item.id}
                className="list-group-item"
                onClick={() => handleItemClick(item)}
                style={{ cursor: "pointer" }}
              >
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default MenuPage;