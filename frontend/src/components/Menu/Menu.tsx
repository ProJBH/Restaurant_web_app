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
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  // 新增状态，用于记录当前被点击的菜单项
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    axios.get("/api/menu")
      .then(function(response) {
        console.log("Menu data:", response.data);
        setMenuItems(response.data);
      })
      .catch(function(error) {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  // 根据 category（忽略大小写）将数据分组
  const groupedItems = menuItems.reduce((acc: { [key: string]: MenuItem[] }, item) => {
    const cat = item.category.toLowerCase();
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(item);
    return acc;
  }, {});

  // 定义显示的分类顺序
  const categoriesOrder = ["starter", "main", "drink", "dessert"];

  // 点击事件：设置当前点击的菜单项，从而触发模态框显示
  const handleItemClick = function(item: MenuItem) {
    setSelectedItem(item);
  };

  // 点击模态框外区域或点击关闭按钮时，关闭模态框
  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className={styles.menuContainer}>
      <h1 className={styles.menuTitle}>Menu</h1>
      {categoriesOrder.map((cat) => (
        <section key={cat} className={styles.categorySection}>
          <h2 className={styles.categoryHeader}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </h2>
          <ul className={styles.menuItemList}>
            {groupedItems[cat] && groupedItems[cat].map(item => (
              <li
                key={item.id}
                className={styles.menuItem}
                onClick={() => handleItemClick(item)}
                style={{ cursor: "pointer" }}
              >
                <span className={styles.itemName}>
                  {item.name}
                  {item.allergy && (
                    <span className={styles.allergy}>({item.allergy})</span>
                  )}
                </span>
                <span className={styles.itemPrice}>
                  ${parseFloat(item.price).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* 模态框：当 selectedItem 不为空时显示 */}
      {selectedItem && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalCard}
            onClick={e => e.stopPropagation()}  // 阻止点击卡片内容关闭模态框
          >
            {/* 如果存在 imageurl，则显示图片 */}
            {selectedItem.imageurl && (
              <img
                src={selectedItem.imageurl}
                alt={selectedItem.name}
                className={styles.modalImage}
              />
            )}
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>
            {selectedItem.allergy && (
              <p className={styles.allergy}>
                Allergy Info: ({selectedItem.allergy})
              </p>
            )}
            <p>
              Price: ${parseFloat(selectedItem.price).toFixed(2)}
            </p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
