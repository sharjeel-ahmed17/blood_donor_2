import express from "express";

import { getDonor } from "../controllers/blooddonor.js";
import { authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

router.get('/donor', authenticateUser, getDonor)


export default router;
