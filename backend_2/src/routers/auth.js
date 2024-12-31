import express from "express";
import { login, signup } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
export default router;

// router.post("/reset-password", (req, res) => {});
// router.post("/forger-password", (req, res) => {});
