// src/pages/AdminDashBoardPage.tsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import CreateForm from "../components/CreateForm/CreateForm";
import EditModal from "../components/EditModal/EditModal";
import DataTable from "../components/DataTable/DataTable";
import {
  fetchMenuItems,
  createMenuItem,
  updateMenuItem,
  MenuItem
} from "../Modules/crudModule";

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
  const [activeOperation, setActiveOperation] = useState<CRUDOperation>("read");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    allergy: "",
    description: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sortField, setSortField] = useState<keyof MenuItem | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [modalFormData, setModalFormData] = useState<Partial<ModalFormData>>({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const loadMenuItems = () => {
    fetchMenuItems()
      .then(response => setMenuItems(response.data))
      .catch(err => {
        console.error("Error fetching menu items:", err);
        setError("Error fetching menu items.");
      });
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
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
        setFormData({ name: "", category: "", price: "", allergy: "", description: "" });
        loadMenuItems();
      })
      .catch(err => {
        console.error("Error creating menu item:", err);
        setError("Error creating menu item.");
      });
  };

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
      .catch(err => {
        console.error("Error updating menu item:", err);
        setError("Error updating menu item.");
      });
  };

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
      .catch(err => {
        console.error("Error disabling menu item:", err);
        setError("Error disabling menu item.");
      });
  };

  const handleSort = (field: keyof MenuItem) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

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

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", marginTop: "60px" }}>
        <Sidebar activeOperation={activeOperation} setActiveOperation={setActiveOperation} />
        <div style={{ flex: 1, padding: "1rem" }}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          {activeOperation === "create" ? (
            <CreateForm
              formData={formData}
              onInputChange={handleCreateInputChange}
              onSubmit={handleCreateSubmit}
            />
          ) : (
            <DataTable
              menuItems={menuItems}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              onRowClick={handleRowClick}
            />
          )}
        </div>
      </div>
      {modalItem && (
        <EditModal
          modalItem={modalItem}
          modalFormData={modalFormData}
          setModalFormData={setModalFormData}
          onUpdate={handleUpdate}
          onDisable={handleDisable}
          onClose={() => {
            setModalItem(null);
            setModalFormData({});
          }}
        />
      )}
      <div style={{ textAlign: "right", padding: "1rem" }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashBoardPage;
