import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import axios from "axios";
import { toast } from "react-toastify";

const MyEnrollments = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    navigate,
    userData,
    fetchEnrolledCourses,
    backendUrl,
    getToken,
    calculateNoLectures,
  } = useAppContext();
  const [progressArray, setProgressArray] = useState([]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          let totalLecture = calculateNoLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;
          return { totalLecture, lectureCompleted };
        })
      );
      setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=> {
    if(userData){
      fetchEnrolledCourses()
    }
  },[userData])

  useEffect(()=> {
    if(enrolledCourses.length > 0){
      getCourseProgress()
    }
  },[userData])

  return (
    <div className="md:px-36 px-4 pt-10 pb-16">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        My Enrollments
      </h1>

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
              const percentage = progress
                ? (progress.lectureCompleted / progress.totalLecture) * 100
                : 0;

              return (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-sky-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={course.courseThumbnail}
                        alt="thumbnail"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <p className="font-medium">{course.courseTitle}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm mb-1">
                      {progress.lectureCompleted} / {progress.totalLecture}{" "}
                      Lectures
                    </div>
                    <Line
                      percent={percentage}
                      strokeWidth={4}
                      strokeColor="#0ea5e9"
                      trailWidth={4}
                      trailColor="#e5e7eb"
                      className="rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate("/player/" + course._id)}
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

      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        {enrolledCourses.map((course, index) => {
          const progress = progressArray[index];
          const isCompleted =
            progress?.lectureCompleted === progress?.totalLecture;
          const percentage = progress
            ? (progress.lectureCompleted / progress.totalLecture) * 100
            : 0;

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
                  <p className="font-semibold text-gray-800">
                    {course.courseTitle}
                  </p>
                  <p className="text-sm text-gray-500">
                    {calculateCourseDuration(course)}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-1">
                Progress: {progress.lectureCompleted} / {progress.totalLecture}{" "}
                Lectures
              </p>

              <Line
                percent={percentage}
                strokeWidth={3}
                strokeColor="#0ea5e9"
                trailWidth={3}
                trailColor="#e5e7eb"
                className="rounded-full mb-2"
              />

              <button
                onClick={() => navigate("/player/" + course._id)}
                className={`px-3 py-1 text-sm rounded-md font-medium cursor-pointer ${
                  isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {isCompleted ? "Completed" : "On Going"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyEnrollments;
