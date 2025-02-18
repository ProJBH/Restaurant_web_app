"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/menu.ts
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
// Configure Multer for file uploads
// Defines a storage engine and tells Multer where and how to store uploaded files on disk.
const storage = multer_1.default.diskStorage({
    // Receives the request (req), the file object (file), and a callback (cb).  
    destination: (req, file, cb) => {
        // callback value set to null and compute the destination folder where files will be stored.
        cb(null, path_1.default.join(__dirname, '../../public/uploads'));
    },
    /**
     * 1. Generates a unique file name using the current timestamp and a random number.
     * 2. Appends the original file extension using path.extname(file.originalname).
     * 3. Calls the callback with null and the generated unique file name.
     */
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
// Creates an upload middleware instance by passing the storage configuration to Multer.
// This middleware will later be used to handle single-file uploads in one of the routes.
const upload = (0, multer_1.default)({ storage });
// Get all menu items (public endpoint)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db_1.default.execute('SELECT * FROM menu_items');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
// Update or add a menu item (admin only)
// For adding/updating text details (name, description, price)
router.post('/', auth_1.verifyToken, async (req, res) => {
    // Only allow admin users
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    const { id, name, description, price } = req.body;
    try {
        if (id) {
            // update existing
            await db_1.default.execute('UPDATE menu_items SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id]);
            res.json({ message: 'Menu item updated' });
        }
        else {
            // insert new
            await db_1.default.execute('INSERT INTO menu_items (name, description, price) VALUES (?, ?, ?)', [name, description, price]);
            res.json({ message: 'Menu item added' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
// Upload an image for a menu item (admin only)
router.post('/upload', auth_1.verifyToken, upload.single('image'), async (req, res) => {
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
exports.default = router;
