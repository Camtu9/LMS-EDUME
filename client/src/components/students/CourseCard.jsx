import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useAppContext();
  const rating = calculateRating(course);
  const hasRatings = course.courseRatings.length > 0;

  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
    >
      <div className="relative">
        <img className="w-full" src={course.courseThumbnail} alt="" />
        {course.discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{course.discount}%
          </span>
        )}
      </div>
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">{course.educator.name}</p>
        {hasRatings && (
          <div className="flex items-center space-x-2">
            <p>{rating}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                  alt=""
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p className="text-gray-500">{course.courseRatings.length}</p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-gray-700">
            {(
              course.coursePrice -
              (course.discount * course.coursePrice) / 100
            ).toFixed(2)}
            {currency}
          </p>
          <p className="text-sm font-medium text-gray-500 line-through">
            {course.coursePrice}
            {currency}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
