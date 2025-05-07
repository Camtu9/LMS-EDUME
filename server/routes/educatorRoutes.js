import express from "express";
import {
  addCourse,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
  updateCourse,
  updateRoleToEducator,
} from "../controllers/educatorController.js";
import upload from "../configs/multer.js";
import {
  protectEducator,
  verifyToken,
} from "../middlewares/authMiddlewares.js";

const educatorRouter = express.Router();

educatorRouter.post("/update-role", verifyToken, updateRoleToEducator);
educatorRouter.post(
  "/add-course",
  upload.single("image"),
  verifyToken,
  protectEducator,
  addCourse
);
educatorRouter.get(
  "/courses",
  verifyToken,
  protectEducator,
  getEducatorCourses
);
educatorRouter.put(
  "/update-course/:id",
  upload.single("image"),
  verifyToken,
  protectEducator,
  updateCourse
);
educatorRouter.get(
  "/dashboard",
  verifyToken,
  protectEducator,
  educatorDashboardData
);
educatorRouter.get(
  "/enrolled-students",
  verifyToken,
  protectEducator,
  getEnrolledStudentsData
);

export default educatorRouter;
