import express from "express";
import * as adminController from "../controllers/admin.controller.js"; 

const router = express.Router();

/**
 * @route   GET /api/admin/student-status
 * @access  Public
 */
router.get("/student-status/", adminController.getStudentStatistics);

/**
 * @route   GET /api/admin/entry-exits-status
 * @access  Public
 */
router.get("/entry-exits-status/", adminController.getEntryExitStatistics);

export default router;
