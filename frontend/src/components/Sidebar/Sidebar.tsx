// src/components/Sidebar.tsx
// uesd in AdminDashBoardPage.tsx
import React from "react";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  activeOperation: "create" | "read" | "update" | "delete";
  setActiveOperation: (op: "create" | "read" | "update" | "delete") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeOperation, setActiveOperation }) => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.menuList}>
        <li
          className={`${styles.menuItem} ${activeOperation === "create" ? styles.active : ""}`}
          onClick={() => setActiveOperation("create")}
        >
          Create
        </li>
        <li
          className={`${styles.menuItem} ${activeOperation === "read" ? styles.active : ""}`}
          onClick={() => setActiveOperation("read")}
        >
          Read
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
