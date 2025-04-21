import { createContext, useContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const navigate = useNavigate();
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let total = 0;
    course.courseRatings.forEach((rating) => {
      return (total += rating.rating);
    });
    return total / course.courseRatings.length;
  };

  const calculateChapterTime = (chapter) => {
    const totalMinutes = chapter.chapterContent.reduce(
      (sum, lecture) => sum + lecture.lectureDuration,
      0
    );
    return humanizeDuration(totalMinutes * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    const totalMinutes = course.courseContent
      .flatMap((chapter) => chapter.chapterContent)
      .reduce((sum, lecture) => sum + lecture.lectureDuration, 0);
    return humanizeDuration(totalMinutes * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateNoLecture = (course) => {
    let total = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        total += chapter.chapterContent.length;
      }
    });
    return total;
  };

  const fetchEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  }

  useEffect(() => {
    fetchAllCourses();
    fetchEnrolledCourses();
  },[]);
  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoLecture,
    enrolledCourses, fetchEnrolledCourses
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
