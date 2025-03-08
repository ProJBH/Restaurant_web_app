// src/routes/menu.ts
import { Router, Request, Response } from 'express';
import pool from '../db';
import { verifyToken, AuthRequest } from '../middleware/auth';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configure Multer for file uploads

// Defines a storage engine and tells Multer where and how to store uploaded files on disk.
const storage = multer.diskStorage({

  // Receives the request (req), the file object (file), and a callback (cb).  
  destination: (req, file, cb) => {

    // callback value set to null and compute the destination folder where files will be stored.
    cb(null, path.join(__dirname, '../../public/uploads'));
  },

  /**
   * 1. Generates a unique file name using the current timestamp and a random number.
   * 2. Appends the original file extension using path.extname(file.originalname).
   * 3. Calls the callback with null and the generated unique file name.
   */
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Creates an upload middleware instance by passing the storage configuration to Multer.
// This middleware will later be used to handle single-file uploads in one of the routes.
const upload = multer({ storage });

// Get all menu items (public endpoint)
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM menu');
    // force rows to be [] in order to use .map functin, then Convert price to a number
    const data = (rows as any[]).map(function(item: any) {
      return { ...item, price: parseFloat(item.price) };
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update or add a menu item (admin only)
// For adding/updating text details (name, description, price)
router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
  // Only allow admin users
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  const { id, name, description, price } = req.body;
  try {
    if (id) {
      // update existing
      await pool.execute(
        'UPDATE menu_items SET name = ?, description = ?, price = ? WHERE id = ?',
        [name, description, price, id]
      );
      res.json({ message: 'Menu item updated' });
    } else {
      // insert new
      await pool.execute(
        'INSERT INTO menu_items (name, description, price) VALUES (?, ?, ?)',
        [name, description, price]
      );
      res.json({ message: 'Menu item added' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Upload an image for a menu item (admin only)
router.post('/upload', verifyToken, upload.single('image'), async (req: AuthRequest, res: Response) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Update the menu item record with the image URL.
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ message: 'File uploaded', imageUrl });
});

export default router;
