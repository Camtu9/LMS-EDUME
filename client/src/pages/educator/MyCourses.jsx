import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import axios from "axios";
import { toast } from "react-toastify"; // Import modal
import EditCourse from "../../components/educator/EditCourse";
import { FaEdit } from "react-icons/fa";

const MyCourses = () => {
  const { currency, backendUrl, token, isEducator, navigate } = useAppContext();
  const [courses, setCourses] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/educator/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  // Open modal to edit course
  const openModal = (courseId) => {
    setSelectedCourse(courseId);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600">
        <h3 className="text-lg font-semibold">
          You haven’t published any courses yet.
        </h3>
        <p className="text-sm mt-2">
          Start sharing your knowledge by creating your first course.
        </p>
        <button
          onClick={() => navigate("/educator/add-course")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Course
        </button>
      </div>
    );
  }

  return courses ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 p-4 bg-gray-50">
      <div className="w-full">
        <h2 className="text-xl font-medium text-gray-900 pb-4">My Courses</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md hidden md:block">
          <table className="min-w-full table-auto text-sm text-left text-gray-500">
            <thead className="text-sm text-gray-900 border-b border-gray-300 uppercase">
              <tr>
                <th className="px-4 py-3 text-center font-semibold hidden sm:table-cell">
                  All Courses
                </th>
                <th className="px-4 py-3 text-center font-semibold">
                  Earnings
                </th>
                <th className="px-4 py-3 text-center font-semibold hidden sm:table-cell">
                  Students
                </th>
                <th className="px-4 py-3 text-center font-semibold">
                  Published On
                </th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                  onClick={() => navigate(`/course/${course._id}`)}
                >
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img
                      src={course.courseThumbnail}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <span className="truncate">{course.courseTitle}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-green-600 font-semibold">
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}{" "}
                    {currency}
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-500">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(course._id);
                      }}
                      className="px-3 py-2 bg-yellow-500 text-white rounded-md flex items-center gap-2 text-sm hover:bg-yellow-600 cursor-pointer"
                    >
                      <FaEdit className="text-base" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden bg-white rounded-lg shadow-md mt-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border-b border-gray-200 p-4 flex justify-between items-center gap-4"
            >
              <div
                className="flex gap-4 flex-1 cursor-pointer"
                onClick={() => navigate(`/course/${course._id}`)}
              >
                <img
                  src={course.courseThumbnail}
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div className="flex flex-col">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                    {course.courseTitle}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    Earnings:{" "}
                    <span className="text-green-600 font-semibold">
                      {Math.floor(
                        course.enrolledStudents.length *
                          (course.coursePrice -
                            (course.discount * course.coursePrice) / 100)
                      )}{" "}
                      {currency}
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Students: {course.enrolledStudents.length}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Published on:{" "}
                    {new Date(course.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => openModal(course._id)}
                className="bg-yellow-500 text-white p-2 rounded-md text-xs flex items-center justify-center"
              >
                <FaEdit />
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedCourse && (
        <EditCourse courseId={selectedCourse} closeModal={closeModal} />
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
