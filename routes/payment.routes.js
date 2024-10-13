import express from "express";
import * as payment from "../controllers/student.payment.controller.js"; 

const router = express.Router();

router.get("/create-order/", payment.createOrder);

router.post("/verify-order/", payment.verifyOrder);

export default router;
