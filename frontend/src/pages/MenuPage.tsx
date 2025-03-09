// src/pages/MenuPage.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu/Menu";
import styles from "./MenuPage.module.scss"; // 引入 CSS 模块

const MenuPage: React.FC = () => {
  return (
    <div className={styles.menuPageContainer}>
      <Navbar />
      <Menu />
    </div>
  );
};

export default MenuPage;
