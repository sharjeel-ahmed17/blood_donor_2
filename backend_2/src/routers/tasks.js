import express from "express";
import { addTask, getTasks, getTaskById, updateTask, deleteTask } from "../controllers/tasks.js";
const router = express.Router();


router.post("/", addTask );
router.get("/", getTasks );
router.get("/:id", getTaskById );
router.put("/:id", updateTask );
router.delete("/:id", deleteTask );

export default router;
