import express from 'express';
import { register, login } from '../controller/auth.js';
import { validateUser } from '../validation/index.js';

const router = express.Router();

// Authentication routes
router.post('/register',  register);
router.post('/login' , login);

export default router;
