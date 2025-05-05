import express from "express";
import { addUserRating, createUser, getUserCourseProgress, getUserData, loginUser, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";

const userRouter = express.Router()

userRouter.post('/add', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', verifyToken, getUserData);
userRouter.get('/enrolled-courses', userEnrolledCourses)
userRouter.post('/purchase', purchaseCourse)
userRouter.post('/update-course-progress', updateUserCourseProgress)
userRouter.post('/get-course-progress', getUserCourseProgress)
userRouter.post('/add-rating', addUserRating)

export default userRouter