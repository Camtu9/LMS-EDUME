import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { user } = useUser();

  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/course/all`);
      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserData = async () => {
    if (user.publicMetadata.role === "educator") {
      setIsEducator(true);
    }
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + `/api/user/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let total = 0;
    course.courseRatings.forEach((rating) => {
      return (total += rating.rating);
    });
    return Math.floor(total / course.courseRatings.length);
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
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/user/enrolled-courses",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchEnrolledCourses();
    }
  }, [user]);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoLecture,
    enrolledCourses,
    fetchEnrolledCourses,
    backendUrl,
    userData,
    getToken,
    fetchAllCourses,
    setIsEducator,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
