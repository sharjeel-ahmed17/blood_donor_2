import express from "express";

import {
  authenticateUser,
} from "../middleware/authentication.js";
import { addTodo } from "../controllers/todos.js";

const router = express.Router();

router.post("/", authenticateUser, addTodo);

export default router;
