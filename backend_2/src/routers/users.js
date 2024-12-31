import express from "express";
import { authenticateUser } from "../middleware/authentication.js";
import { getUserInfo, myInfo, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get('/userInfo', authenticateUser, getUserInfo)
router.put("/", authenticateUser, myInfo);
router.get("/myInfo", authenticateUser, updateUser);

export default router;
