// src/components/CreateForm.tsx
import React from "react";
import styles from "./CreateForm.module.scss";

interface CreateFormProps {
  formData: {
    name: string;
    category: string;
    price: string;
    allergy: string;
    description: string;
    ingredients: string; // 新增 ingredients 字段
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CreateForm: React.FC<CreateFormProps> = ({
  formData,
  onInputChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <div className={styles.createFormContainer}>
      <h2 className={styles.title}>Create Menu Item</h2>
      <form onSubmit={onSubmit}>
        <div className={styles.formRow}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={onInputChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formRow}>
          <label className={styles.label}>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={onInputChange}
            required
            className={styles.input}
          >
            <option value="">Select category</option>
            <option value="starter">Starter</option>
            <option value="main">Main</option>
            <option value="drink">Drink</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
        <div className={styles.formRow}>
          <label className={styles.label}>Price:</label>
          <input
            type="text"
            name="price"
            placeholder="Price (as string)"
            value={formData.price}
            onChange={onInputChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formRow}>
          <label className={styles.label}>Allergy:</label>
          <input
            type="text"
            name="allergy"
            placeholder="Allergy"
            value={formData.allergy}
            onChange={onInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formRow}>
          <label className={styles.label}>Description:</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={onInputChange}
            required
            className={styles.textarea}
          />
        </div>
        {/* 新增 ingredients 输入项 */}
        <div className={styles.formRow}>
          <label className={styles.label}>Ingredients:</label>
          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients"
            value={formData.ingredients}
            onChange={onInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formRow}>
          <label className={styles.label}>Image:</label>
          <input
            type="file"
            name="image"
            onChange={onFileChange}
            required
            className={styles.input}
            accept="image/*"
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
