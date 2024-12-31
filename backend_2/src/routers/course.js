import express from "express";
import { addCourse, getCourse } from "../controllers/course.js";
import { authenticateUser } from "../middleware/authentication.js";
const router = express.Router();

router.get("/", authenticateUser,  getCourse);

router.post("/", addCourse);

export default router;
