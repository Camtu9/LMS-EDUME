// import humanizeDuration from "humanize-duration";
// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../../context/AppContext";
// import { useParams } from "react-router-dom";
// import { assets } from "../../assets/assets";
// import Rating from "../../components/students/Rating";
// import YouTube from "react-youtube";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Player = () => {
//   const {
//     enrolledCourses,
//     calculateChapterTime,
//     backendUrl,
//     getToken,
//     userData,
//     fetchEnrolledCourses,
//   } = useAppContext();
//   const { courseId } = useParams();

//   const [courseData, setCourseData] = useState(null);
//   const [openSections, setOpenSections] = useState({});
//   const [playerData, setPlayerData] = useState(null);
//   const [completedLectures, setCompletedLectures] = useState([]);
//   const [progressData, setProgressData] = useState(null);
//   const [initialRating, setInitialRating] = useState(0);

//   const getCourseData = () => {
//     enrolledCourses.map((course) => {
//       if (course._id === courseId) {
//         setCourseData(course);
//         course.courseRatings.map((item) => {
//           if (item.userId === userData._id) {
//             setInitialRating(item.rating);
//           }
//         });
//       }
//     });
//   };

//   useEffect(() => {
//     if (enrolledCourses.length > 0) {
//       getCourseData();
//     }
//   }, [enrolledCourses]);

//   const markLectureCompleted = async (lectureId) => {
//     try {
//       const token = await getToken();
//       const { data } = await axios.post(
//         backendUrl + "/api/user/update-course-progress",
//         { courseId, lectureId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         getCourseProgress();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const getCourseProgress = async () => {
//     try {
//       const token = await getToken();
//       const { data } = await axios.post(
//         backendUrl + "/api/user/get-course-progress",
//         { courseId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (data.success) {
//         setProgressData(data.progressData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const toggleSection = (index) => {
//     setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
//   };

//   const handleRate = async (rating) => {
//     try {
//       const token = await getToken();
//       const { data } = axios.post(
//         backendUrl + `/api/user/add-rating`,
//         { courseId, rating },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (data.success) {
//         toast.success(data.message)
//         fetchEnrolledCourses()
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(()=>{
//     getCourseProgress()
//   },[])

//   return courseData ? (
//     <div className="p-4 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
//       <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           Course Content
//         </h2>
//         <div className="space-y-4">
//           {courseData &&
//             courseData.courseContent.map((chapter, chapterIndex) => (
//               <div
//                 key={chapterIndex}
//                 className="border border-gray-100 rounded-xl shadow-sm"
//               >
//                 <div
//                   className="flex justify-between items-center px-4 py-3 cursor-pointer"
//                   onClick={() => toggleSection(chapterIndex)}
//                 >
//                   <div className="flex items-center gap-2">
//                     <img
//                       src={assets.down_arrow_icon}
//                       className={`w-4 transition-transform ${
//                         openSections[chapterIndex] ? "rotate-180" : ""
//                       }`}
//                     />
//                     <p className="font-medium text-gray-800">
//                       {chapter.chapterTitle}
//                     </p>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     {chapter.chapterContent.length} lectures •{" "}
//                     {calculateChapterTime(chapter)}
//                   </p>
//                 </div>

//                 <div
//                   className={`overflow-hidden transition-all duration-300 ${
//                     openSections[chapterIndex] ? "max-h-[800px]" : "max-h-0"
//                   }`}
//                 >
//                   <ul className="pl-10 pr-4 py-2 space-y-2 text-sm text-gray-700 border-t border-gray-100">
//                     {chapter.chapterContent.map((lecture, lectureIndex) => {
//                       const isPlaying =
//                         playerData?.lectureUrl === lecture.lectureUrl;
//                       const isCompleted = completedLectures.includes(
//                         lecture.lectureUrl
//                       );

//                       return (
//                         <li
//                           key={lectureIndex}
//                           className={`flex justify-between items-center ${
//                             isPlaying ? "text-blue-600 font-medium" : ""
//                           }`}
//                         >
//                           <div className="flex gap-2 items-start">
//                             <img
//                               src={
//                                 progressData && progressData.lectureCompleted.includes(playerData.lectureId)
//                                   ? assets.blue_tick_icon
//                                   : assets.play_icon
//                               }
//                               className="w-4 h-4 mt-1"
//                             />
//                             <p>{lecture.lectureTitle}</p>
//                           </div>
//                           <div className="flex items-center gap-2 text-blue-500">
//                             {lecture.lectureUrl && (
//                               <p
//                                 onClick={() =>
//                                   setPlayerData({
//                                     ...lecture,
//                                     chapter: chapterIndex + 1,
//                                     lecture: lectureIndex + 1,
//                                   })
//                                 }
//                                 className="underline hover:text-blue-600 text-sm cursor-pointer"
//                               >
//                                 Watch
//                               </p>
//                             )}
//                             <p className="text-gray-500 text-xs">
//                               {humanizeDuration(
//                                 lecture.lectureDuration * 60000,
//                                 { units: ["h", "m"] }
//                               )}
//                             </p>
//                           </div>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//         </div>

//         <div className="pt-6 border-t border-gray-100 mt-6 flex items-center">
//           <h3 className="text-lg font-semibold text-gray-800 mr-4">
//             Rate this Course:
//           </h3>
//           <Rating initialRating={initialRating} onRate={()=>handleRate()} />
//         </div>
//       </div>

//       <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
//         {playerData ? (
//           <>
//             <div className="w-full aspect-video relative overflow-hidden rounded-md">
//               <YouTube
//                 videoId={playerData.lectureUrl.split("/").pop()}
//                 opts={{
//                   width: "100%",
//                   height: "100%",
//                   playerVars: {
//                     autoplay: 0,
//                   },
//                 }}
//                 className="absolute top-0 left-0 w-full h-full"
//               />
//             </div>
//             <div className="mt-4 flex justify-between items-center">
//               <p className="text-lg font-semibold text-gray-800">
//                 {playerData.chapter}.{playerData.lecture}{" "}
//                 {playerData.lectureTitle}
//               </p>
//               <button
//                 className={`text-sm font-semibold ${
//                   progressData && progressData.lectureCompleted.includes(playerData.lectureId)
//                     ? "text-green-600"
//                     : "text-blue-600"
//                 } hover:underline`}
//                 onClick={() => markLectureCompleted(playerData.lectureId)}
//               >
//                 {progressData && progressData.lectureCompleted.includes(playerData.lectureId)
//                   ? "Completed"
//                   : "Mark Complete"}
//               </button>
//             </div>
//           </>
//         ) : (
//           <img
//             src={courseData ? courseData.courseThumbnail : ""}
//             className="w-full rounded-md"
//             alt="Course thumbnail"
//           />
//         )}
//       </div>
//     </div>
//   ) : <Loading/>
// }

// export default Player;
import humanizeDuration from "humanize-duration";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import Rating from "../../components/students/Rating";
import YouTube from "react-youtube";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/students/Loading";

const Player = () => {
  const {
    enrolledCourses,
    calculateChapterTime,
    backendUrl,
    token,
    userData,
    fetchEnrolledCourses,
  } = useAppContext();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const getCourseData = () => {
    const course = enrolledCourses.find((c) => c._id === courseId);
    if (course) {
      setCourseData(course);
      const rating = course.courseRatings.find(
        (r) => r.userId === userData._id
      );
      if (rating) setInitialRating(rating.rating);
    }
  };

  const getCourseProgress = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/get-course-progress`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) setProgressData(data.progressData);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const markLectureCompleted = async (lectureId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-course-progress`,
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRate = async (rating) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/add-rating`,
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchEnrolledCourses();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) getCourseData();
  }, [enrolledCourses]);

  useEffect(() => {
    getCourseProgress();
  }, []);

  if (!courseData) return <Loading />;

  return (
    <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT: Course Content */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Course Content
        </h2>

        <div className="space-y-4">
          {courseData.courseContent.map((chapter, chapterIndex) => (
            <div
              key={chapterIndex}
              className="bg-white border border-gray-200 rounded-lg shadow-sm transition hover:shadow-md"
            >
              <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => toggleSection(chapterIndex)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={assets.down_arrow_icon}
                    className={`w-4 transition-transform ${
                      openSections[chapterIndex] ? "rotate-180" : ""
                    }`}
                    alt="Toggle"
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
                className={`transition-all overflow-hidden ${
                  openSections[chapterIndex] ? "max-h-[800px]" : "max-h-0"
                }`}
              >
                <ul className="pl-6 pr-4 py-2 space-y-3 text-sm text-gray-700">
                  {chapter.chapterContent.map((lecture, lectureIndex) => {
                    const isPlaying =
                      playerData?.lectureUrl === lecture.lectureUrl;
                    const lectureId = lecture.lectureId;
                    const isCompleted =
                      progressData?.lectureCompleted.includes(lectureId);

                    return (
                      <li
                        key={lectureId || lectureIndex}
                        className="flex justify-between items-center"
                      >
                        <div className="flex gap-2 items-start">
                          <img
                            src={
                              isCompleted
                                ? assets.blue_tick_icon
                                : assets.play_icon
                            }
                            className="w-4 h-4 mt-1"
                            alt="Status"
                          />
                          <span
                            className={`line-clamp-1 ${
                              isPlaying ? "text-blue-600 font-medium" : ""
                            }`}
                          >
                            {lecture.lectureTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {lecture.lectureUrl && (
                            <button
                              onClick={() =>
                                setPlayerData({
                                  ...lecture,
                                  chapter: chapterIndex + 1,
                                  lecture: lectureIndex + 1,
                                  lectureId,
                                })
                              }
                              className={`text-xs underline  ${
                                isCompleted
                                  ? "text-violet-600 hover:text-violet-800"
                                  : "text-blue-600 hover:text-blue-800"
                              }`}
                            >
                              Watch
                            </button>
                          )}
                          <span className="text-gray-400 text-xs">
                            {humanizeDuration(lecture.lectureDuration * 60000, {
                              units: ["h", "m"],
                            })}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Rating */}
        <div className="pt-6 border-t mt-6 flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Rate this Course:
          </h3>
          <Rating initialRating={initialRating} onRate={handleRate} />
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm transition hover:shadow-md">
        {playerData ? (
          <>
            <div className="w-full aspect-video relative overflow-hidden rounded-md mb-4">
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: { autoplay: 0 },
                }}
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800">
                {playerData.chapter}.{playerData.lecture} -{" "}
                {playerData.lectureTitle}
              </p>
              <button
                className={`text-sm font-medium transition ${
                  progressData?.lectureCompleted.includes(playerData.lectureId)
                    ? "text-green-600"
                    : "text-blue-600 hover:text-blue-800"
                }`}
                onClick={() => markLectureCompleted(playerData.lectureId)}
              >
                {progressData?.lectureCompleted.includes(playerData.lectureId)
                  ? "Completed"
                  : "Mark Complete"}
              </button>
            </div>
          </>
        ) : (
          <img
            src={courseData.courseThumbnail}
            className="w-full rounded-md"
            alt="Course Thumbnail"
          />
        )}
      </div>
    </div>
  );
};

export default Player;
