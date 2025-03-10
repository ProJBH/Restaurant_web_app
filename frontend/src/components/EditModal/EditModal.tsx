// src/components/EditModal.tsx
// used in AdminDashBoardPage.tsx
import React from "react";
import styles from "./EditModal.module.scss";
import { MenuItem } from "../../Modules/crudModule";

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

interface EditModalProps {
  modalItem: MenuItem;
  modalFormData: Partial<ModalFormData>;
  setModalFormData: (data: Partial<ModalFormData>) => void;
  onUpdate: (e: React.FormEvent) => void;
  onDisable: () => void;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  modalItem,
  modalFormData,
  setModalFormData,
  onUpdate,
  onDisable,
  onClose
}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <h3>Item Details</h3>
        <div className={styles.row}>
          <label className={styles.label}>ID:</label>
          <span>{modalItem.id}</span>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Createtime:</label>
          <span>{modalItem.createtime}</span>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            value={modalFormData.name || ""}
            placeholder={modalItem.name}
            onChange={(e) => setModalFormData({ ...modalFormData, name: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Category:</label>
          <input
            type="text"
            value={modalFormData.category || ""}
            placeholder={modalItem.category}
            onChange={(e) => setModalFormData({ ...modalFormData, category: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Price:</label>
          <input
            type="text"
            value={modalFormData.price || ""}
            placeholder={modalItem.price}
            onChange={(e) => setModalFormData({ ...modalFormData, price: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Allergy:</label>
          <input
            type="text"
            value={modalFormData.allergy || ""}
            placeholder={modalItem.allergy}
            onChange={(e) => setModalFormData({ ...modalFormData, allergy: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Description:</label>
          <textarea
            value={modalFormData.description || ""}
            placeholder={modalItem.description}
            onChange={(e) => setModalFormData({ ...modalFormData, description: e.target.value })}
            className={styles.textarea}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Popular:</label>
          <input
            type="text"
            value={modalFormData.popular || ""}
            placeholder={modalItem.popular.toString()}
            onChange={(e) => setModalFormData({ ...modalFormData, popular: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Sale:</label>
          <input
            type="text"
            value={modalFormData.sale || ""}
            placeholder={modalItem.sale.toString()}
            onChange={(e) => setModalFormData({ ...modalFormData, sale: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Image URL:</label>
          <input
            type="text"
            value={modalFormData.imageurl || ""}
            placeholder={modalItem.imageurl || ""}
            onChange={(e) => setModalFormData({ ...modalFormData, imageurl: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Ingredients:</label>
          <textarea
            value={modalFormData.ingredients || ""}
            placeholder={modalItem.ingredients}
            onChange={(e) => setModalFormData({ ...modalFormData, ingredients: e.target.value })}
            className={styles.textarea}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Discount %:</label>
          <input
            type="text"
            value={modalFormData.discount_percentage || ""}
            placeholder={modalItem.discount_percentage.toString()}
            onChange={(e) => setModalFormData({ ...modalFormData, discount_percentage: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Disable:</label>
          <input
            type="text"
            value={modalFormData.disable || ""}
            placeholder={modalItem.disable !== undefined ? modalItem.disable.toString() : "0"}
            onChange={(e) => setModalFormData({ ...modalFormData, disable: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonRow}>
          <button onClick={onUpdate} className={styles.button}>Update</button>
          <button onClick={onDisable} className={styles.button}>Disable</button>
          <button onClick={onClose} className={styles.button}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
