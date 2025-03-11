// src/menu.ts
import { Router, Request, Response } from "express";
import db from "../db";
import { verifyToken } from "../middleware/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import multer from "multer";

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/projbh/Github_projects/Restaurant_web_app/frontend/public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<(MenuItem & RowDataPacket)[]>("SELECT * FROM menu");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json({ error: "Error fetching menu items" });
  }
});

// 支持 multipart/form-data，处理文件上传以及 ingredients 字段
router.post("/", verifyToken, upload.single("image"), async (req: Request, res: Response) => {
  try {
    const { name, category, price, allergy, description, ingredients } = req.body;
    let imageUrl: string | null = null;
    if (req.file) {
      imageUrl = "../assets/" + req.file.filename;
    }
    const query =
      "INSERT INTO menu (name, category, price, allergy, description, popular, sale, imageurl, ingredients, discount_percentage) VALUES (?, ?, ?, ?, ?, 0, 0, ?, ?, 0)";
    const [result] = await db.query(query, [name, category, price, allergy, description, imageUrl, ingredients]) as [ResultSetHeader, any];
    const insertedId = result.insertId;
    const [rows] = await db.query<(MenuItem & RowDataPacket)[]>("SELECT * FROM menu WHERE id = ?", [insertedId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error creating menu item:", err);
    res.status(500).json({ error: "Error creating menu item" });
  }
});

// PUT 接口保持不变
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
    const [rows] = await db.query<(MenuItem & RowDataPacket)[]>("SELECT * FROM menu WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error("Error updating menu item:", err);
    res.status(500).json({ error: "Error updating menu item" });
  }
});

export default router;
