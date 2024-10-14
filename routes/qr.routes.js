import express from "express";
import * as qr  from "../controllers/student.qr.controller.js"; 

const router = express.Router();

router.get("/", qr.getData);


export default router;
