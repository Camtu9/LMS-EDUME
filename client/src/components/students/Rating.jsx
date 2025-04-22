import React, { useEffect, useState } from "react";

const Rating = ({ initialRating = 0, onRate, disabled = false }) => {
  const [rating, setRating] = useState(initialRating);
  const [hovered, setHovered] = useState(0);

  const handleRating = (value) => {
    if (disabled) return;
    setRating(value);
    if (onRate) onRate(value);
  };

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const star = index + 1;
        const isFilled = hovered
          ? star <= hovered
          : star <= rating;

        return (
          <span
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors duration-200 ${
              isFilled ? "text-yellow-500" : "text-gray-400"
            } ${disabled && "cursor-default opacity-50"}`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => !disabled && setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
