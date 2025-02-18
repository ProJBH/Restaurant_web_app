"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
// Login route
router.post('/login', async (req, res) => {
    console.log("Login request received. Request body:", req.body);
    const { email, password } = req.body;
    try {
        const [rows] = await db_1.default.execute('SELECT * FROM users WHERE email = ?', [email]);
        console.log('User record from DB:', rows);
        if (!rows.length) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const user = rows[0];
        const passwordIsValid = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Create a token valid for 24 hours
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, role: user.role });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
// Testing get request 
router.get('/login', (req, res) => {
    res.send('This endpoint only supports POST requests.');
});
exports.default = router;
