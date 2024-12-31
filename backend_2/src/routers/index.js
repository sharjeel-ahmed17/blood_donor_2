import express from "express";
import authRoutes from "./auth.js";
import taskRoutes from "./tasks.js";
import userRoutes from "./users.js";
import donorRoutes from "./blooddonors.js";
import todoRoutes from "./todos.js";
import courseRoutes from "./course.js";
import orderRoutes from "./orders.js";
import { authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

router.use(authRoutes);
router.use(authenticateUser , taskRoutes);
router.use(userRoutes);
router.use(donorRoutes);
router.use(todoRoutes);
router.use(courseRoutes);
router.use(orderRoutes);


export default router;
