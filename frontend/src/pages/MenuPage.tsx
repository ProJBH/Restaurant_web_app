// src/pages/MenuPage.tsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Menu from "../components/Menu/Menu";
import styles from "./CommonBackground.module.scss"; // 引入 CSS 模块

const MenuPage: React.FC = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className={styles.backgroundContainer}>
        <Menu />
      </div>
    </div>
  );
};

export default MenuPage;
