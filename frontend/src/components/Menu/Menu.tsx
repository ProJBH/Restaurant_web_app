// frontend/src/pages/Menu.tsx
import React, { useState, useEffect } from "react";
import styles from "./Menu.module.scss";
import axios from "axios";


// 定义 MenuItem 接口，包含数据库 menu 表的所有字段
interface MenuItem {
  id: number;
  name: string;
  category: string; // 枚举值：starter, main, drink, dessert
  price: string; // 注意：MySQL 中 DECIMAL 类型默认返回字符串
  allergy: string;
  description: string;
  popular: number;
  sale: number;
  createtime: string;
  lastedittime: string;
  imageurl: string | null;
  ingredients: string;
  discount_percentage: number;
}

const Menu: React.FC = () => {
  console.log("MenuPage updated");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(function() {
    axios.get("/api/menu")
      .then(function(response) {
        console.log("Menu data:", response.data);
        setMenuItems(response.data);
      })
      .catch(function(error) {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  // 按 category（忽略大小写）将数据分组
  const groupedItems = menuItems.reduce(function(acc: { [key: string]: MenuItem[] }, item) {
    const cat = item.category.toLowerCase();
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(item);
    return acc;
  }, {});

  // 定义分类显示顺序
  const categoriesOrder = ["starter", "main", "drink", "dessert"];

  // 点击事件，目前仅打印日志
  const handleItemClick = function(item: MenuItem) {
    console.log("style: ", styles);
  };

  return (
    <div className={styles.menuContainer}>
      <h1 className={styles.menuTitle}>Menu</h1>
      {categoriesOrder.map(function(cat) {
        return (
          <section key={cat} className={styles.categorySection}>
            <h2 className={styles.categoryHeader}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </h2>
            <ul className={styles.menuItemList}>
              {groupedItems[cat] && groupedItems[cat].map(function(item) {
                return (
                  <li
                    key={item.id}
                    className={styles.menuItem}
                    onClick={function() { handleItemClick(item); }}
                  >
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>
                      ${parseFloat(item.price).toFixed(2)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
};

export default Menu;
