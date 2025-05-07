import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.role === "educator") {
      return res.json({
        success: false,
        message: "Your role is already educator",
      });
    }
    await User.findByIdAndUpdate(userId, { role: "educator" }, { new: true });
    res.json({
      success: true,
      message: "You can publish a course now",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// add Course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.user.id;
    if (!imageFile) {
      return res.json({
        success: false,
        message: "Thumbnail not attached",
      });
    }
    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    parsedCourseData.isPublished = true;
    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();
    res.json({
      success: true,
      message: "Course is added",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// get courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.user.id;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//update course
export const updateCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;

    const parsedCourseData = JSON.parse(courseData);
    const courseId = parsedCourseData._id;

    if (!courseId) {
      return res.json({
        success: false,
        message: "Course ID is missing",
      });
    }

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path);
      parsedCourseData.courseThumbnail = imageUpload.secure_url;
    }

    await Course.findByIdAndUpdate(courseId, parsedCourseData);

    return res.json({
      success: true,
      message: "Course is updated",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// get dashboard
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.user.id;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;
    const courseIds = courses.map((course) => course._id);
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });
    const totalEarnings = purchases.reduce((sum, pc) => sum + pc.amount, 0);

    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );
      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        totalCourses,
        enrolledStudentsData,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get enrolled students data
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.user.id;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name")
      .populate("courseId", "courseTitle");
    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));
    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
