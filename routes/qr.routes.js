import express from "express";
import * as qr  from "../controllers/student.qr.controller.js"; 
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, qr.getData);
router.post("/add-vip/", qr.newVipAdd);


export default router;
