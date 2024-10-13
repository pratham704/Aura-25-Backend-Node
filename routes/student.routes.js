import express from "express";
import * as authStudent from "../controllers/auth/auth.student.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import * as health from "../controllers/healthCheck.controller.js";
import * as profile from "../controllers/student.profile.controller.js";

const router = express.Router();

/**
 * @route   POST /api/students/register
 * @desc    Register a new student
 * @access  Public
 */
router.post("/register/", authStudent.createStudent)



/**
 * @route   POST /api/students/login
 * @desc    Login a student
 * @access  Public
 */
router.post("/login/", authStudent.loginStudent);


/**
 * @route   GET /api/students/profile
 * @desc    Get student profile information
 * @access  Private
 */
router.get("/profile/", authenticate, profile.getStudentProfile);


/**
 * @route   GET /api/students/profile_checker
 * @desc    Check student profile completeness
 * @access  Private
 */
router.get("/profile_checker/", authenticate, profile.getProfileChecker);

/**
 * @route   POST /api/students/edit_profile
 * @desc    Edit student profile information
 * @access  Private
 */
router.post("/edit_profile/", authenticate, profile.editStudentProfile);

/**
 * @route   GET /api/students/
 * @desc    Get all students
 * @access  Public
 */
router.get("/", profile.getAllStudents);



/**
 * @route   GET /api/students/health_check
 * @desc    Health check endpoint
 * @access  Public
 */
router.get("/health_check/", health.healthCheck);


export default router;
