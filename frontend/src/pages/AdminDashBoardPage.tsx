// src/pages/AdminDashBoardPage.tsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import {
  fetchMenuItems,
  createMenuItem,
  updateMenuItem,
  MenuItem
} from "../Modules/crudModule";

// 定义弹窗表单数据接口，所有字段均为字符串，包括 disable 字段
interface ModalFormData {
  name: string;
  category: string;
  price: string;
  allergy: string;
  description: string;
  popular: string;
  sale: string;
  imageurl: string;
  ingredients: string;
  discount_percentage: string;
  disable: string;
}

type CRUDOperation = "create" | "read" | "update" | "delete";

const AdminDashBoardPage: React.FC = () => {
  // 默认显示查询结果（Read）
  const [activeOperation, setActiveOperation] = useState<CRUDOperation>("read");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    allergy: "",
    description: "",
    popular: "",
    sale: "",
    imageurl: "",
    ingredients: "",
    discount_percentage: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // 用于表格排序
  const [sortField, setSortField] = useState<keyof MenuItem | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // 弹窗相关状态：选中的记录及弹窗表单数据
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [modalFormData, setModalFormData] = useState<Partial<ModalFormData>>({});

  // 新增 logout 方法
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const loadMenuItems = () => {
    fetchMenuItems()
      .then((response) => setMenuItems(response.data))
      .catch((err) => {
        console.error("Error fetching menu items:", err);
        setError("Error fetching menu items.");
      });
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 创建操作（Create）
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Partial<MenuItem> = {
      name: formData.name,
      category: formData.category,
      price: formData.price,
      allergy: formData.allergy,
      description: formData.description
    };
    createMenuItem(newItem)
      .then(() => {
        setSuccess("Menu item created successfully.");
        setFormData({
          id: "",
          name: "",
          category: "",
          price: "",
          allergy: "",
          description: "",
          popular: "",
          sale: "",
          imageurl: "",
          ingredients: "",
          discount_percentage: ""
        });
        loadMenuItems();
      })
      .catch((err) => {
        console.error("Error creating menu item:", err);
        setError("Error creating menu item.");
      });
  };

  // 弹窗内更新操作（Update 按钮提交所有编辑内容）
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalItem) {
      setError("No item selected.");
      return;
    }
    const updatedItem: Partial<MenuItem> = {
      name: modalFormData.name,
      category: modalFormData.category,
      price: modalFormData.price,
      allergy: modalFormData.allergy,
      description: modalFormData.description,
      popular: modalFormData.popular ? parseInt(modalFormData.popular) : 0,
      sale: modalFormData.sale ? parseInt(modalFormData.sale) : 0,
      imageurl: modalFormData.imageurl,
      ingredients: modalFormData.ingredients,
      discount_percentage: modalFormData.discount_percentage ? parseInt(modalFormData.discount_percentage) : 0,
      disable: modalFormData.disable ? parseInt(modalFormData.disable) : 0
    };
    updateMenuItem(modalItem.id, updatedItem)
      .then(() => {
        setSuccess("Menu item updated successfully.");
        setModalItem(null);
        setModalFormData({});
        loadMenuItems();
      })
      .catch((err) => {
        console.error("Error updating menu item:", err);
        setError("Error updating menu item.");
      });
  };

  // Disable 操作：直接将 disable 字段更新为 1
  const handleDisable = () => {
    if (!modalItem) {
      setError("No item selected.");
      return;
    }
    updateMenuItem(modalItem.id, { disable: 1 } as Partial<MenuItem>)
      .then(() => {
        setSuccess("Menu item disabled successfully.");
        setModalItem(null);
        setModalFormData({});
        loadMenuItems();
      })
      .catch((err) => {
        console.error("Error disabling menu item:", err);
        setError("Error disabling menu item.");
      });
  };

  // 表头点击排序
  const handleSort = (field: keyof MenuItem) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // 点击表格行弹出详情编辑模态框，填充数据（除 id 与 createtime 外，包括 disable 字段）
  const handleRowClick = (item: MenuItem) => {
    setModalItem(item);
    setModalFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      allergy: item.allergy,
      description: item.description,
      popular: item.popular.toString(),
      sale: item.sale.toString(),
      imageurl: item.imageurl || "",
      ingredients: item.ingredients,
      discount_percentage: item.discount_percentage.toString(),
      disable: item.disable !== undefined ? item.disable.toString() : "0"
    });
  };

  // 固定侧边栏（四个选项）
  const renderSidebar = () => (
    <div style={{ width: "200px", borderRight: "1px solid #ccc", padding: "1rem" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li
          style={{
            marginBottom: "1rem",
            cursor: "pointer",
            fontWeight: activeOperation === "create" ? "bold" : "normal"
          }}
          onClick={() => {
            setActiveOperation("create");
            setError("");
            setSuccess("");
          }}
        >
          Create
        </li>
        <li
          style={{
            marginBottom: "1rem",
            cursor: "pointer",
            fontWeight: activeOperation === "read" ? "bold" : "normal"
          }}
          onClick={() => {
            setActiveOperation("read");
            setError("");
            setSuccess("");
          }}
        >
          Read
        </li>
      </ul>
    </div>
  );

  // 渲染内容：创建、查询、更新、删除界面
  const renderContent = () => {
    if (activeOperation === "create") {
      return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              width: "100%",
              maxWidth: "500px"
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Create Menu Item</h2>
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
                <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
                <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>
                  Category:
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="Category (starter, main, drink, dessert)"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
                <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>
                  Price:
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="Price (as string)"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
                <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>
                  Allergy:
                </label>
                <input
                  type="text"
                  name="allergy"
                  placeholder="Allergy"
                  value={formData.allergy}
                  onChange={handleInputChange}
                  style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
                <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>
                  Description:
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button type="submit" style={{ padding: "0.5rem 1rem" }}>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      // 对数据进行排序
      const sortedMenuItems = [...menuItems];
      if (sortField) {
        sortedMenuItems.sort((a, b) => {
          if (sortField === "price") {
            return sortOrder === "asc"
              ? parseFloat(a.price) - parseFloat(b.price)
              : parseFloat(b.price) - parseFloat(a.price);
          } else {
            const aVal = (a[sortField] as string).toLowerCase();
            const bVal = (b[sortField] as string).toLowerCase();
            if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
            if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
            return 0;
          }
        });
      }
      return (
        <div>
          <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>ID</th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Name</th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("category")}>
                  Category {sortField === "category" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("price")}>
                  Price {sortField === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Allergy</th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Description</th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Popular</th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Sale</th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Createtime</th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Lastedittime</th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Image URL</th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Ingredients</th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Discount Percentage</th>
                <th style={{ backgroundColor: "#f2f2f2", padding: "8px", border: "1px solid #ddd" }}>Disable</th>
              </tr>
            </thead>
            <tbody>
              {sortedMenuItems.map(item => (
                <tr key={item.id} onClick={() => handleRowClick(item)} style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.id}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.name}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.category}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.price}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.allergy}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.description}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.popular}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.sale}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.createtime}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.lastedittime}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.imageurl}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.ingredients}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.discount_percentage}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{item.disable !== undefined ? item.disable : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", marginTop: "60px" }}>
        {renderSidebar()}
        <div style={{ flex: 1, padding: "1rem" }}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          {renderContent()}
        </div>
      </div>
      {/* 弹窗：点击表格行后弹出详情编辑界面 */}
      {modalItem && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem"
          }}
          onClick={() => {
            setModalItem(null);
            setModalFormData({});
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: "400px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Item Details</h3>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>ID:</label>
              <span>{modalItem.id}</span>
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Createtime:</label>
              <span>{modalItem.createtime}</span>
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Name:</label>
              <input
                type="text"
                value={modalFormData.name || ""}
                placeholder={modalItem.name}
                onChange={(e) =>
                  setModalFormData({ ...modalFormData, name: e.target.value })
                }
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Category:</label>
              <input
                type="text"
                value={modalFormData.category || ""}
                placeholder={modalItem.category}
                onChange={(e) =>
                  setModalFormData({ ...modalFormData, category: e.target.value })
                }
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Price:</label>
              <input
                type="text"
                value={modalFormData.price || ""}
                placeholder={modalItem.price}
                onChange={(e) =>
                  setModalFormData({ ...modalFormData, price: e.target.value })
                }
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Allergy:</label>
              <input
                type="text"
                value={modalFormData.allergy || ""}
                placeholder={modalItem.allergy}
                onChange={(e) =>
                  setModalFormData({ ...modalFormData, allergy: e.target.value })
                }
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Description:</label>
              <textarea
                value={modalFormData.description || ""}
                placeholder={modalItem.description}
                onChange={(e) =>
                  setModalFormData({ ...modalFormData, description: e.target.value })
                }
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Popular:</label>
              <input
                type="text"
                value={modalFormData.popular || ""}
                placeholder={modalItem.popular.toString()}
                onChange={(e) =>
                  setModalFormData({ ...modalFormData, popular: e.target.value })
                }
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Sale:</label>
              <input
                type="text"
                value={modalFormData.sale || ""}
                placeholder={modalItem.sale.toString()}
                onChange={(e) =>
                  setModalFormData({ ...modalFormData, sale: e.target.value })
                }
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Image URL:</label>
              <input
                type="text"
                value={modalFormData.imageurl || ""}
                placeholder={modalItem.imageurl || ""}
                onChange={(e) =>
                  setModalFormData({ ...modalFormData, imageurl: e.target.value })
                }
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Ingredients:</label>
              <textarea
                value={modalFormData.ingredients || ""}
                placeholder={modalItem.ingredients}
                onChange={(e) =>
                  setModalFormData({ ...modalFormData, ingredients: e.target.value })
                }
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Discount Percentage:</label>
              <input
                type="text"
                value={modalFormData.discount_percentage || ""}
                placeholder={modalItem.discount_percentage.toString()}
                onChange={(e) =>
                  setModalFormData({ ...modalFormData, discount_percentage: e.target.value })
                }
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
              <label style={{ width: "150px", textAlign: "right", marginRight: "1rem" }}>Disable:</label>
              <input
                type="text"
                value={modalFormData.disable || ""}
                placeholder={modalItem.disable !== undefined ? modalItem.disable.toString() : "0"}
                onChange={(e) =>
                  setModalFormData({ ...modalFormData, disable: e.target.value })
                }
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleDisable} style={{ marginLeft: "1rem" }}>
                Disable
              </button>
              <button
                onClick={() => {
                  setModalItem(null);
                  setModalFormData({});
                }}
                style={{ marginLeft: "1rem" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{ textAlign: "right", padding: "1rem" }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashBoardPage;
