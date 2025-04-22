import humanizeDuration from "humanize-duration";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import Rating from "../../components/students/Rating";
import YouTube from "react-youtube";

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useAppContext();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);

  useEffect(() => {
    const found = enrolledCourses.find((c) => c._id === courseId);
    if (found) setCourseData(found);
  }, [enrolledCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleMarkComplete = (lectureUrl) => {
    setCompletedLectures((prev) =>
      prev.includes(lectureUrl)
        ? prev.filter((url) => url !== lectureUrl)
        : [...prev, lectureUrl]
    );
  };

  return (
    <div className="p-4 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Course Content
        </h2>
        <div className="space-y-4">
          {courseData &&
            courseData.courseContent.map((chapter, chapterIndex) => (
              <div
                key={chapterIndex}
                className="border border-gray-100 rounded-xl shadow-sm"
              >
                <div
                  className="flex justify-between items-center px-4 py-3 cursor-pointer"
                  onClick={() => toggleSection(chapterIndex)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.down_arrow_icon}
                      className={`w-4 transition-transform ${
                        openSections[chapterIndex] ? "rotate-180" : ""
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
                    openSections[chapterIndex] ? "max-h-[800px]" : "max-h-0"
                  }`}
                >
                  <ul className="pl-10 pr-4 py-2 space-y-2 text-sm text-gray-700 border-t border-gray-100">
                    {chapter.chapterContent.map((lecture, lectureIndex) => {
                      const isPlaying =
                        playerData?.lectureUrl === lecture.lectureUrl;
                      const isCompleted = completedLectures.includes(
                        lecture.lectureUrl
                      );

                      return (
                        <li
                          key={lectureIndex}
                          className={`flex justify-between items-center ${
                            isPlaying ? "text-blue-600 font-medium" : ""
                          }`}
                        >
                          <div className="flex gap-2 items-start">
                            <img
                              src={
                                isCompleted
                                  ? assets.blue_tick_icon
                                  : assets.play_icon
                              }
                              className="w-4 h-4 mt-1"
                            />
                            <p>{lecture.lectureTitle}</p>
                          </div>
                          <div className="flex items-center gap-2 text-blue-500">
                            {lecture.lectureUrl && (
                              <p
                                onClick={() =>
                                  setPlayerData({
                                    ...lecture,
                                    chapter: chapterIndex + 1,
                                    lecture: lectureIndex + 1,
                                  })
                                }
                                className="underline hover:text-blue-600 text-sm cursor-pointer"
                              >
                                Watch
                              </p>
                            )}
                            <p className="text-gray-500 text-xs">
                              {humanizeDuration(
                                lecture.lectureDuration * 60000,
                                { units: ["h", "m"] }
                              )}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
        </div>

        <div className="pt-6 border-t border-gray-100 mt-6 flex items-center">
          <h3 className="text-lg font-semibold text-gray-800 mr-4">
            Rate this Course:
          </h3>
          <Rating initialRating={0} />
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
        {playerData ? (
          <>
            <div className="w-full aspect-video relative overflow-hidden rounded-md">
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 0,
                  },
                }}
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800">
                {playerData.chapter}.{playerData.lecture}{" "}
                {playerData.lectureTitle}
              </p>
              <button
                className={`text-sm font-semibold ${
                  completedLectures.includes(playerData.lectureUrl)
                    ? "text-green-600"
                    : "text-blue-600"
                } hover:underline`}
                onClick={() => handleMarkComplete(playerData.lectureUrl)}
              >
                {completedLectures.includes(playerData.lectureUrl)
                  ? "Completed"
                  : "Mark Complete"}
              </button>
            </div>
          </>
        ) : (
          <img
            src={courseData ? courseData.courseThumbnail : ""}
            className="w-full rounded-md"
            alt="Course thumbnail"
          />
        )}
      </div>
    </div>
  );
};

export default Player;
