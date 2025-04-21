import Home from "../pages/students/Home";
import CoursesList from "../pages/students/CoursesList";
import CourseDetail from "../pages/students/CourseDetail";
import MyEnrollments from "../pages/students/MyEnrollments";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/course-list", element: <CoursesList /> },
  { path: "/course-list/:input", element: <CoursesList /> },
  { path: "/course/:id", element: <CourseDetail /> },
  { path: "/my-enrollments", element: <MyEnrollments /> },
];
