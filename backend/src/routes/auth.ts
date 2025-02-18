// src/routes/auth.ts
import { Router, Request, Response } from 'express';
import pool from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Login route
router.post('/login', async (req: Request, res: Response) => {
  console.log("Login request received. Request body:", req.body);
  const { email, password } = req.body;
  try {
    console.log("inside try block");
    const [rows]: any = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    console.log('User record from DB:', rows);
    if (!rows.length) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const user = rows[0];
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Create a token valid for 24 hours
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Testing get request 
router.get('/login', (req: Request, res: Response) => {
    res.send('This endpoint only supports POST requests.');
  });
  

export default router;
