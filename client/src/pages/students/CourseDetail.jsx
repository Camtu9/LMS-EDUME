import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Youtube from "react-youtube";
import axios from "axios";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoLecture,
    currency,
    backendUrl,
    userData,
    getToken,
  } = useAppContext();

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/" + id);
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const enrolledCourse = async () => {
    try {
      if (!userData) {
        return toast.warn("Login to enroll course");
      }
      if (isEnrolled) {
        return toast.warn("Already Enrolled");
      }
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/purchase",
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (!courseData) return <Loading />;

  const discountedPrice = (
    courseData.coursePrice -
    (courseData.discount * courseData.coursePrice) / 100
  ).toFixed(2);

  return (
    <div className="relative md:px-36 px-6 pt-20 pb-10 text-gray-700">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-sky-100/70 to-transparent z-0" />

      <div className="relative z-10 flex flex-col md:flex-row gap-10">
        <div className="flex-1 max-w-2xl space-y-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {courseData.courseTitle}
            </h1>
            <p
              className="pt-4 text-base text-gray-600"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription.slice(0, 200),
              }}
            ></p>
            <div className="flex flex-wrap items-center gap-3 pt-4 text-sm text-gray-500">
              <p className="font-medium text-yellow-600">
                {calculateRating(courseData)}
              </p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.floor(calculateRating(courseData))
                        ? assets.star
                        : assets.star_blank
                    }
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <span>({courseData.courseRatings.length} ratings)</span>
              <span>• {courseData.enrolledStudents.length} students</span>
              <span>
                • By{" "}
                <span className="text-blue-500 underline">
                  {courseData.educator.name}
                </span>
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Course Structure
            </h2>
            <div className="pt-4 space-y-3">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm transition hover:shadow-md"
                >
                  <div
                    className="flex justify-between items-center px-4 py-3 cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        className={`w-4 transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                      />
                      <p className="font-medium text-gray-800">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures •{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc pl-10 pr-4 py-2 text-sm text-gray-600 border-t border-gray-100">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex justify-between items-center py-1"
                        >
                          <div className="flex gap-2 items-start">
                            <img
                              src={assets.play_icon}
                              className="w-4 h-4 mt-1"
                            />
                            <p>{lecture.lectureTitle}</p>
                          </div>
                          <div className="flex items-center gap-2 text-blue-500">
                            {lecture.isPreviewFree && (
                              <button
                                onClick={() =>
                                  setPlayerData({
                                    videoId: lecture.lectureUrl
                                      .split("/")
                                      .pop(),
                                  })
                                }
                                className="underline hover:text-blue-600 text-sm"
                              >
                                Preview
                              </button>
                            )}
                            <p className="text-gray-500 text-xs">
                              {humanizeDuration(
                                lecture.lectureDuration * 60000,
                                { units: ["h", "m"] }
                              )}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              className="pt-3 [&>h2]:font-semibold [&>h2]:text-gray-800 [&>ul]:list-disc [&>ul]:ml-4 text-gray-500"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        <div className="w-full md:max-w-sm bg-white rounded-md shadow-lg overflow-hidden md:ml-10">
          {playerData ? (
            <Youtube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              className="w-full aspect-video object-cover"
            />
          )}
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <img src={assets.time_left_clock_icon} className="w-4" />
              <p>
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-semibold text-gray-900">
                {discountedPrice} {currency}
              </p>
              <p className="line-through text-gray-400">
                {courseData.coursePrice} {currency}
              </p>
              <p className="text-green-600 font-medium">
                {courseData.discount}% off
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-2">
              <div className="flex items-center gap-1">
                <img src={assets.star} />
                <span>{calculateRating(courseData)}</span>
              </div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} />
                <span>{calculateCourseDuration(courseData)}</span>
              </div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} />
                <span>{calculateNoLecture(courseData)} lessons</span>
              </div>
            </div>
            <button onClick={()=> enrolledCourse()} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              {isEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
            <div className="pt-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                What’s in the course?
              </h4>
              <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                <li>Unlimited access with lifetime updates.</li>
                <li>Guided, practical project walkthroughs.</li>
                <li>Downloadable assets and project files.</li>
                <li>Interactive assessments for reinforcement.</li>
                <li>Certificate upon completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
