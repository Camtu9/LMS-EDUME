import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import SearchBar from "../../components/students/SearchBar";
import { useSearchParams, useNavigate } from "react-router-dom";
import CourseCard from "../../components/students/CourseCard";
import { assets } from "../../assets/assets";

const CoursesList = () => {
  const { allCourses } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredCourse, setFilteredCourse] = useState([]);

  const input = searchParams.get("q") || "";

  useEffect(() => {
    if (!allCourses?.length) return;

    const filtered = input
      ? allCourses.filter((c) =>
          c.courseTitle.toLowerCase().includes(input.toLowerCase())
        )
      : allCourses;

    setFilteredCourse(filtered);
  }, [allCourses, input]);

  const handleClearSearch = () => {
    setSearchParams({});
  };

  return (
    <div className="relative md:px-36 px-8 pt-20 text-left">
      <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
          <p className="text-gray-500">
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </span>
            / <span>Course List</span>
          </p>
        </div>
        <SearchBar data={input} setSearchParams={setSearchParams} />
      </div>

      {input && (
        <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600 rounded-sm border-gray-500">
          <p>{input}</p>
          <img
            src={assets.cross_icon}
            className="cursor-pointer"
            onClick={handleClearSearch}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
        {filteredCourse.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
