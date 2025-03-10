// src/menu.ts
import { Router, Request, Response } from "express";
import db from "../db"; // 使用提供的 db.ts
import { verifyToken } from "../middleware/auth"; // 使用提供的 auth.ts
import { RowDataPacket, ResultSetHeader } from "mysql2";
// 定义 MenuItem 接口，与数据库 menu 表对应
interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: string;
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

const router = Router();

// GET /api/menu - 获取所有菜单项
router.get("/", async (req: Request, res: Response) => {
  try {
    // 指定返回类型为 (MenuItem & RowDataPacket)[]
    const [rows] = await db.query<(MenuItem & RowDataPacket)[]>("SELECT * FROM menu");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json({ error: "Error fetching menu items" });
  }
});

router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const { name, category, price, allergy, description } = req.body;
    const query =
      "INSERT INTO menu (name, category, price, allergy, description, popular, sale, imageurl, ingredients, discount_percentage) VALUES (?, ?, ?, ?, ?, 0, 0, NULL, '', 0)";
    // 对插入结果做类型断言，result 为 ResultSetHeader
    const [result] = await db.query(query, [name, category, price, allergy, description]) as [ResultSetHeader, any];
    const insertedId = result.insertId;
    // 查询新创建的记录，类型为 (MenuItem & RowDataPacket)[]
    const [rows] = await db.query<(MenuItem & RowDataPacket)[]>("SELECT * FROM menu WHERE id = ?", [insertedId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error creating menu item:", err);
    res.status(500).json({ error: "Error creating menu item" });
  }
});

// PUT /api/menu/:id - 更新菜单项（包括更新 disable 字段）
router.put("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allowedFields = [
      "name",
      "category",
      "price",
      "allergy",
      "description",
      "popular",
      "sale",
      "imageurl",
      "ingredients",
      "discount_percentage",
      "disable"
    ];
    const updates: string[] = [];
    const values: any[] = [];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(req.body[field]);
      }
    });
    if (updates.length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }
    const query = `UPDATE menu SET ${updates.join(", ")} WHERE id = ?`;
    values.push(id);
    await db.query(query, values);
    // 查询更新后的记录，类型为 (MenuItem & RowDataPacket)[]
    const [rows] = await db.query<(MenuItem & RowDataPacket)[]>("SELECT * FROM menu WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error("Error updating menu item:", err);
    res.status(500).json({ error: "Error updating menu item" });
  }
});

export default router;
