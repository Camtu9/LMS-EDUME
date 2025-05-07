import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
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
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isEducator, setIsEducator] = useState(userData?.role === "educator");

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const openSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const openSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const closeModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

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
    try {
      const { data } = await axios.get(backendUrl + `/api/user/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
        setIsEducator(data.user.role === "educator");
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

  const signIn = (user) => {
    setUserData(user);
    setToken(user.token);
    localStorage.setItem("token", user.token);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserData(null);
    setIsEducator(false);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserData();
      fetchEnrolledCourses();
    }
  }, [token]);

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
    token,
    fetchAllCourses,
    setIsEducator,
    showSignIn,
    showSignUp,
    openSignIn,
    openSignUp,
    closeModals,
    setUserData,
    signOut,
    signIn,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
