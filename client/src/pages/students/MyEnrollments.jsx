import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } = useAppContext();
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLecture: 4 },
    { lectureCompleted: 4, totalLecture: 6 },
    { lectureCompleted: 4, totalLecture: 4 },
    { lectureCompleted: 2, totalLecture: 8 },
    { lectureCompleted: 4, totalLecture: 4 },
    { lectureCompleted: 3, totalLecture: 6 },
    { lectureCompleted: 2, totalLecture: 8 },
    { lectureCompleted: 2, totalLecture: 8 },
    { lectureCompleted: 1, totalLecture: 8 },
    { lectureCompleted: 2, totalLecture: 10 },
    { lectureCompleted: 2, totalLecture: 8 },
    { lectureCompleted: 3, totalLecture: 4 },
    { lectureCompleted: 1, totalLecture: 8 },
    { lectureCompleted: 2, totalLecture: 4 },
  ]);

  return (
    <div className="md:px-36 px-4 pt-10 pb-16">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">My Enrollments</h1>
      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white hidden md:block">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100 text-gray-700 text-base">
            <tr>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Progress</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourses.map((course, index) => {
              const progress = progressArray[index];
              const isCompleted =
                progress?.lectureCompleted === progress?.totalLecture;

              return (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-sky-50 transition"
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={course.courseThumbnail}
                      alt="thumbnail"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <p className="font-medium">{course.courseTitle}</p>
                  </td>
                  <td className="px-6 py-4">{calculateCourseDuration(course)}</td>
                  <td className="px-6 py-4">
                    {progress && (
                      <span>
                        {progress.lectureCompleted} / {progress.totalLecture} Lectures
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                    onClick={()=>navigate('/player/' + course._id)}
                      className={`px-3 py-1 text-sm rounded-md font-medium ${
                        isCompleted
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {isCompleted ? "Completed" : "On Going"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden space-y-4">
        {enrolledCourses.map((course, index) => {
          const progress = progressArray[index];
          const isCompleted =
            progress?.lectureCompleted === progress?.totalLecture;

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={course.courseThumbnail}
                  alt="thumbnail"
                  className="w-14 h-14 object-cover rounded-md"
                />
                <div>
                  <p className="font-semibold text-gray-800">{course.courseTitle}</p>
                  <p className="text-sm text-gray-500">{calculateCourseDuration(course)}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-1">
                Progress: {progress.lectureCompleted} / {progress.totalLecture} Lectures
              </p>
              <span
                className={`inline-block px-3 py-1 text-sm rounded-md font-medium ${
                  isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {isCompleted ? "Completed" : "On Going"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyEnrollments;
