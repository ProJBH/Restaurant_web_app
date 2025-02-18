// src/pages/MenuPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/menu')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  return (
    <div>
      <h1>Our Menu</h1>
      {menuItems.map(item => (
        <div key={item.id} style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem 0' }}>
          {item.image_url && <img src={`http://localhost:5001${item.image_url}`} alt={item.name} width="150" />}
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p><strong>${item.price}</strong></p>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
