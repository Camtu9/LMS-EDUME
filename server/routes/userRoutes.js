import express from "express";
import {
  addUserRating,
  changePassword,
  createUser,
  getUserCourseProgress,
  getUserData,
  loginUser,
  purchaseCourse,
  updateUserCourseProgress,
  updateUserInformation,
  userEnrolledCourses,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";

const userRouter = express.Router();

userRouter.post("/add", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", verifyToken, getUserData);
userRouter.put("/update", verifyToken, updateUserInformation);
userRouter.put("/change-password", verifyToken, changePassword);
userRouter.get("/enrolled-courses", verifyToken, userEnrolledCourses);
userRouter.post("/purchase", verifyToken, purchaseCourse);
userRouter.post(
  "/update-course-progress",
  verifyToken,
  updateUserCourseProgress
);
userRouter.post("/get-course-progress", verifyToken, getUserCourseProgress);
userRouter.post("/add-rating", verifyToken, addUserRating);

export default userRouter;
