import express from "express";
const router = express.Router();
import { getOrder } from "../controllers/orders.js";


router.get("/",  getOrder);


export default router;
