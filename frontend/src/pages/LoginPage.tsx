import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Login from "../components/Login/Login";
import styles from "./CommonBackground.module.scss"; // 引入 CSS 模块

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className={styles.backgroundContainer}>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
