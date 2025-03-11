// src/modules/crudModule.ts
import axios from "axios";

const API_URL = "http://localhost:5001/api/menu";

export interface MenuItem {
  id: number;
  name: string;
  category: string;           // 枚举值：starter, main, dessert, drink
  price: string;              // MySQL DECIMAL 类型默认返回字符串
  allergy: string;
  description: string;
  popular: number;
  sale: number;
  createtime: string;
  lastedittime: string;
  imageurl: string | null;
  ingredients: string;
  discount_percentage: number;
  disable?: number;
}

// 获取所有菜单项 (Read)
export const fetchMenuItems = () => {
  return axios.get(API_URL);
};

// 创建新菜单项 (Create)
export const createMenuItem = (item: Partial<MenuItem> | FormData) => {
  const token = localStorage.getItem("token");
  return axios.post(API_URL, item, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// 更新菜单项 (Update) —— 包括更新 disable 字段
export const updateMenuItem = (id: number, item: Partial<MenuItem>) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API_URL}/${id}`, item, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
