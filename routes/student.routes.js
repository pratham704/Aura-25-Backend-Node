import express from "express";
import * as authStudent from "../controllers/auth/auth.student.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js";
import * as health  from "../controllers/healthCheck.controller.js";
import * as profile from "../controllers/student.profile.controller.js"

const router = express.Router();

router.post("/register/" , authStudent.createStudent);
router.post("/login/",  authStudent.loginStudent);
router.get("/health_check/", health.healthCheck );
router.get("/profile/" , authenticate ,  profile.getStudentProfile );
router.get("/profile_checker/" , profile.getProfileChecker );



router.get("/", authenticate, profile.getAllStudents);



export default router;