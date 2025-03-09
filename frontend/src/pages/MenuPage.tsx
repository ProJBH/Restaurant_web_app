// src/pages/MenuPage.tsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Menu from "../components/Menu/Menu";
import styles from "./MenuPage.module.scss"; // 引入 CSS 模块

const MenuPage: React.FC = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className={styles.menuPageContainer}>
        <Menu />
      </div>
    </div>
  );
};

export default MenuPage;
