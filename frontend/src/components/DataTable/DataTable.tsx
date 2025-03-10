// src/components/DataTable.tsx
// used in AdminDashBoardPage.tsx
import React from "react";
import styles from "./DataTable.module.scss";
import { MenuItem } from "../../Modules/crudModule";

interface DataTableProps {
  menuItems: MenuItem[];
  sortField: keyof MenuItem | "";
  sortOrder: "asc" | "desc";
  onSort: (field: keyof MenuItem) => void;
  onRowClick: (item: MenuItem) => void;
}

const DataTable: React.FC<DataTableProps> = ({ menuItems, sortField, sortOrder, onSort, onRowClick }) => {
  return (
    <table className={styles.dataTable}>
      <thead>
        <tr>
          <th onClick={() => onSort("id")} className={styles.headerCell}>ID</th>
          <th onClick={() => onSort("name")} className={styles.headerCell}>Name</th>
          <th onClick={() => onSort("category")} className={styles.headerCell}>
            Category {sortField === "category" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </th>
          <th onClick={() => onSort("price")} className={styles.headerCell}>
            Price {sortField === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </th>
          <th className={styles.headerCell}>Allergy</th>
          <th className={styles.headerCell}>Description</th>
          <th className={styles.headerCell}>Popular</th>
          <th className={styles.headerCell}>Sale</th>
          <th className={styles.headerCell}>Createtime</th>
          <th className={styles.headerCell}>Lastedittime</th>
          <th className={styles.headerCell}>Image URL</th>
          <th className={styles.headerCell}>Ingredients</th>
          <th className={styles.headerCell}>Discount Percentage</th>
          <th className={styles.headerCell}>Disable</th>
        </tr>
      </thead>
      <tbody>
        {menuItems.map((item) => (
          <tr key={item.id} onClick={() => onRowClick(item)} className={styles.dataRow}>
            <td className={styles.cell}>{item.id}</td>
            <td className={styles.cell}>{item.name}</td>
            <td className={styles.cell}>{item.category}</td>
            <td className={styles.cell}>{item.price}</td>
            <td className={styles.cell}>{item.allergy}</td>
            <td className={styles.cell}>{item.description}</td>
            <td className={styles.cell}>{item.popular}</td>
            <td className={styles.cell}>{item.sale}</td>
            <td className={styles.cell}>{item.createtime}</td>
            <td className={styles.cell}>{item.lastedittime}</td>
            <td className={styles.cell}>{item.imageurl}</td>
            <td className={styles.cell}>{item.ingredients}</td>
            <td className={styles.cell}>{item.discount_percentage}</td>
            <td className={styles.cell}>{item.disable !== undefined ? item.disable : 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
