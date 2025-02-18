// src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface MenuItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

const AdminDashboard: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem>({ name: '', description: '', price: 0 });
  const token = localStorage.getItem('token');

  const fetchMenuItems = () => {
    axios.get('http://localhost:5001/api/menu')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Error fetching menu:', error));
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/menu', editingItem, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response.data);
        setEditingItem({ name: '', description: '', price: 0 });
        fetchMenuItems();
      })
      .catch(error => console.error('Error updating menu:', error));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      axios.post('http://localhost:5001/api/menu/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        // Optionally update the editingItem with the image URL.
        setEditingItem(prev => ({ ...prev, image_url: response.data.imageUrl }));
      })
      .catch(error => console.error('Error uploading file:', error));
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Add / Edit Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={editingItem.name} onChange={handleInputChange} required />
        <textarea name="description" placeholder="Description" value={editingItem.description} onChange={handleInputChange} required />
        <input name="price" type="number" placeholder="Price" value={editingItem.price} onChange={handleInputChange} required />
        <input type="file" onChange={handleFileUpload} />
        <button type="submit">Submit</button>
      </form>
      <h2>Current Menu Items</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
