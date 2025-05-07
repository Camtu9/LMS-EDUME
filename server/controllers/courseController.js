import Course from "../models/Course.js";

// get all courses

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get course by id

export const getCourseId = async (req, res) => {
  try {
    const { id } = req.params;
    const courseData = await Course.findById(id).populate({ path: "educator" });
    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });
    res.json({ success: true, courseData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req, res) => {
    try {
      const { courseData } = req.body;
      const imageFile = req.file;
  
      if (!imageFile) {
        return res.json({
          success: false,
          message: "Thumbnail not attached",
        });
      }
  
      const parsedCourseData = JSON.parse(courseData);
      const courseId = parsedCourseData._id;
  
      if (!courseId) {
        return res.json({
          success: false,
          message: "Course ID is missing",
        });
      }
  
      const imageUpload = await cloudinary.uploader.upload(imageFile.path);
      parsedCourseData.courseThumbnail = imageUpload.secure_url;
  
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
  
