import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Youtube from "react-youtube";

// const CourseDetail = () => {
//   const { id } = useParams();
//   const [courseData, setCourseData] = useState(null);
//   const [openSections, setOpenSections] = useState({});
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [playerData, setPlayerData] = useState(null);

//   const {
//     allCourses,
//     calculateRating,
//     calculateChapterTime,
//     calculateCourseDuration,
//     calculateNoLecture,
//     currency,
//   } = useAppContext();
//   const fetchCourseData = async () => {
//     const course = allCourses.find((course) => course._id === id);
//     setCourseData(course);
//   };
//   useEffect(() => {
//     fetchCourseData();
//   }, []);

//   const toggleSection = (index) => {
//     setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
//   };
//   return courseData ? (
//     <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
//       <div className="absolute top-0 left-0 w-full h-[500px] -z-1 bg-gradient-to-b from-sky-100/70"></div>
//       <div className="max-w-xl z-10 text-gray-500">
//         <h1 className="md:text-3xl text-2xl font-semibold text-gray-800">
//           {courseData.courseTitle}
//         </h1>
//         <p
//           className="pt-4 md:text-base text-sm"
//           dangerouslySetInnerHTML={{
//             __html: courseData.courseDescription.slice(0, 200),
//           }}
//         ></p>
//         <div className=" flex items-center space-x-2 pt-3 pb-1">
//           <p>{calculateRating(courseData)}</p>
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <img
//                 key={i}
//                 src={
//                   i < Math.floor(calculateRating(courseData))
//                     ? assets.star
//                     : assets.star_blank
//                 }
//                 alt=""
//                 className="w-3.5 h-3.5"
//               />
//             ))}
//           </div>
//           <p className="text-blue-600">
//             ({courseData.courseRatings.length}{" "}
//             {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
//           </p>
//           <p>
//             {courseData.enrolledStudents.length}{" "}
//             {courseData.enrolledStudents.length > 1 ? "students" : "student"}
//           </p>
//         </div>
//         <p className="text-sm">
//           Course by <span className="text-blue-600 underline">EduMe</span>
//         </p>
//         <div className="pt-8 text-gray-800">
//           <h2 className="text-xl font-semibold">Course Structure</h2>
//           <div className="pt-5">
//             {courseData.courseContent.map((chapter, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-300 bg-white mb-2 rounded"
//               >
//                 <div
//                   className="fllex items-center justify-between px-4 py-3 cursor-pointer select-none"
//                   onClick={() => toggleSection(index)}
//                 >
//                   <div className="flex items-center gap-2">
//                     <img
//                       className={`transform transition-transform ${
//                         openSections[index] ? "rotate-180" : ""
//                       }`}
//                       src={assets.down_arrow_icon}
//                     />
//                     <p className="font-medium md:text-base text-sm">
//                       {chapter.chapterTitle}
//                     </p>
//                   </div>
//                   <p className="text-sm md:text-base">
//                     {chapter.chapterContent.length} lectures -{" "}
//                     {calculateChapterTime(chapter)}
//                   </p>
//                 </div>
//                 <div
//                   className={`overflow-hidden transition-all duration-300 ${
//                     openSections[index] ? "max-h-96" : "max-h-0"
//                   }`}
//                 >
//                   <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
//                     {chapter.chapterContent.map((lecture, i) => (
//                       <li key={i} className="flex items-start gap-2 py-1 ">
//                         <img src={assets.play_icon} className="w-4 h-4 mt-1" />
//                         <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-base">
//                           <p>{lecture.lectureTitle}</p>
//                           <div className="flex gap-2">
//                             {lecture.isPreviewFree && (
//                               <p
//                                 onClick={() =>
//                                   setPlayerData({
//                                     videoId: lecture.lectureUrl
//                                       .split("/")
//                                       .pop(),
//                                   })
//                                 }
//                                 className="text-blue-500 cursor-pointer"
//                               >
//                                 Preview
//                               </p>
//                             )}
//                             <p>
//                               {humanizeDuration(
//                                 lecture.lectureDuration * 60 * 1000,
//                                 { units: ["h", "m"] }
//                               )}
//                             </p>
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800">
//             Course Description
//           </h3>
          // <p
          //   className="pt-3 [&>h2]:font-semibold [&>h2]:text-gray-800 [&>ul]:list-disc [&>ul]:ml-4"
          //   dangerouslySetInnerHTML={{
          //     __html: courseData.courseDescription,
          //   }}
          // ></p>
//         </div>
//       </div>
//       <div className="max-w-[424px] z-10 shadow-[0px 4px 15px 2px] rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
//         {playerData ? (
//           <Youtube
//             videoId={playerData.videoId}
//             opts={{ playervars: { autoPlay: 1 } }}
//             iframeClassName="w-full aspect-video"
//           />
//         ) : (
//           <img src={courseData.courseThumbnail} />
//         )}
//         <div className="p-5">
//           <div className="flex items-center gap-2">
//             <img src={assets.time_left_clock_icon} className="w-3.5" />
//             <p className="text-red-500">
//               <span className="font-medium">5 days</span> left at this price!
//             </p>
//           </div>
//           <div className="flex gap-3 items-center pt-2">
//             <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
//               {(
//                 courseData.coursePrice -
//                 (courseData.discount * courseData.coursePrice) / 100
//               ).toFixed(2)}{" "}
//               {currency}
//             </p>
//             <p className="md:text-lg text-gray-500 line-through">
//               {courseData.coursePrice} {currency}
//             </p>
//             <p className="md:text-lg text-gray-500">
//               {courseData.discount}% off
//             </p>
//           </div>
//           <div className="flex items-center text-sm md:text-base gap-4 pt-2 md:pt-4 text-gray-500">
//             <div className="flex items-center gap-1">
//               <img src={assets.star} />
//               <p>{calculateRating(courseData)}</p>
//             </div>
//             <div className="h-4 w-px bg-gray-500/40"></div>
//             <div className="flex items-center gap-1">
//               <img src={assets.time_clock_icon} />
//               <p>{calculateCourseDuration(courseData)}</p>
//             </div>
//             <div className="h-4 w-px bg-gray-500/40"></div>
//             <div className="flex items-center gap-1">
//               <img src={assets.lesson_icon} />
//               <p>{calculateNoLecture(courseData)} lessons</p>
//             </div>
//           </div>
//           <button className="md:mt-6 mt-4 w-full py03 rounded bg-blue-600 text-white font-medium">
//             {isEnrolled ? "Already Enrolled" : "Enroll Now"}
//           </button>
//           <div className="pt-6">
//             <p className="md:text-xl text-lg font-medium text-gray-800">
//               What;s in the course?
//             </p>
//             <ul className="ml-4 pt-2 text-sm md:text-base list-disc text-gray-500">
//               <li>Unlimited access with lifetime updates.</li>
//               <li>Guided, practical project walkthroughs.</li>
//               <li>Includes downloadable assets and full project files.</li>
//               <li>Interactive assessments to reinforce learning.</li>
//               <li>Earn a certificate upon course completion.</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <Loading />
//   );
// };
// ...giữ nguyên các import

const CourseDetail = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoLecture,
    currency,
  } = useAppContext();

  useEffect(() => {
    const course = allCourses.find((c) => c._id === id);
    setCourseData(course);
  }, [id, allCourses]);

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
            <h1 className="text-3xl font-bold text-gray-900">{courseData.courseTitle}</h1>
            <p
              className="pt-4 text-base text-gray-600"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription.slice(0, 200),
              }}
            ></p>
            <div className="flex flex-wrap items-center gap-3 pt-4 text-sm text-gray-500">
              <p className="font-medium text-yellow-600">{calculateRating(courseData)}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <span>({courseData.courseRatings.length} ratings)</span>
              <span>• {courseData.enrolledStudents.length} students</span>
              <span>• By <span className="text-blue-500 underline">EduMe</span></span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">Course Structure</h2>
            <div className="pt-4 space-y-3">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm transition hover:shadow-md">
                  <div
                    className="flex justify-between items-center px-4 py-3 cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        className={`w-4 transition-transform ${openSections[index] ? "rotate-180" : ""}`}
                      />
                      <p className="font-medium text-gray-800">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures • {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc pl-10 pr-4 py-2 text-sm text-gray-600 border-t border-gray-100">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex justify-between items-center py-1">
                          <div className="flex gap-2 items-start">
                            <img src={assets.play_icon} className="w-4 h-4 mt-1" />
                            <p>{lecture.lectureTitle}</p>
                          </div>
                          <div className="flex items-center gap-2 text-blue-500">
                            {lecture.isPreviewFree && (
                              <button
                                onClick={() =>
                                  setPlayerData({ videoId: lecture.lectureUrl.split("/").pop() })
                                }
                                className="underline hover:text-blue-600 text-sm"
                              >
                                Preview
                              </button>
                            )}
                            <p className="text-gray-500 text-xs">
                              {humanizeDuration(lecture.lectureDuration * 60000, { units: ["h", "m"] })}
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
            <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
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
            <img src={courseData.courseThumbnail} className="w-full aspect-video object-cover" />
          )}
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <img src={assets.time_left_clock_icon} className="w-4" />
              <p><span className="font-medium">5 days</span> left at this price!</p>
            </div>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-semibold text-gray-900">{discountedPrice} {currency}</p>
              <p className="line-through text-gray-400">{courseData.coursePrice} {currency}</p>
              <p className="text-green-600 font-medium">{courseData.discount}% off</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-2">
              <div className="flex items-center gap-1"><img src={assets.star} /><span>{calculateRating(courseData)}</span></div>
              <div className="flex items-center gap-1"><img src={assets.time_clock_icon} /><span>{calculateCourseDuration(courseData)}</span></div>
              <div className="flex items-center gap-1"><img src={assets.lesson_icon} /><span>{calculateNoLecture(courseData)} lessons</span></div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              {isEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
            <div className="pt-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">What’s in the course?</h4>
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
