import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const MyCourses = () => {
  const { currency, backendUrl, getToken, isEducator, navigate } = useAppContext();
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
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

  return courses ? (
    <div className="h-screen flex flex-col items-start justify-between p-8 bg-gray-50">
      <div className="w-full">
        <h2 className="text-xl font-medium text-gray-900 pb-4">My Courses</h2>

        {/* Table for larger screens */}
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
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden bg-white rounded-lg shadow-md mt-4">
          {courses.map((course) => (
            <div key={course._id} className="border-b border-gray-200 p-4" onClick={()=>navigate(`/course/${course._id}`)}>
              <div className="flex items-center space-x-4">
                <img
                  src={course.courseThumbnail}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex flex-col">
                  <h3 className="font-medium text-gray-900">
                    {course.courseTitle}
                  </h3>
                  <p className="text-gray-500 text-sm">
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
                  <p className="text-gray-500 text-sm">
                    Students: {course.enrolledStudents.length}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Published on:{" "}
                    {new Date(course.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
