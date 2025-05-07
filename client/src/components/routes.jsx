import Home from "../pages/students/Home";
import CoursesList from "../pages/students/CoursesList";
import CourseDetail from "../pages/students/CourseDetail";
import MyEnrollments from "../pages/students/MyEnrollments";
import Player from "../pages/students/Player";
import Educator from "../pages/educator/Educator";
import Dashboard from "../pages/educator/Dashboard";
import AddCourse from "../pages/educator/AddCourse";
import MyCourses from "../pages/educator/MyCourses";
import StudentsEnrolled from "../pages/educator/StudentsEnrolled";
import UserPage from "../pages/UserPage";
import PaymentFailure from "../pages/students/PaymentFailure";
import PaymentSuccess from "../pages/students/PaymentSuccess";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/course-list", element: <CoursesList /> },
  { path: "/course-list/:input", element: <CoursesList /> },
  { path: "/course/:id", element: <CourseDetail /> },
  { path: "/my-enrollments", element: <MyEnrollments /> },
  { path: "/player/:courseId", element: <Player /> },
  {
    path: "/educator",
    element: <Educator />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "add-course", element: <AddCourse /> },
      { path: "my-courses", element: <MyCourses /> },
      { path: "student-enrolled", element: <StudentsEnrolled/> },
    ],
  },
  { path: "/profile", element: <UserPage /> },
  { path: "/payment-success", element: <PaymentSuccess /> },
  { path: "/payment-fail", element: <PaymentFailure/> },
];
