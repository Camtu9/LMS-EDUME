import React from "react";
import { assets, dummyFeedBack } from "../../assets/assets";

const FeedBackSection = () => {
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800">Customer Opinions</h2>
      <p className="md:text-base text-gray-500 mt-3">
        Listen to our learners as they share their transformative experiences,
        achievements, and how our platform has made a meaningful impact on their
        journey.
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 mt-14">
        {dummyFeedBack.map((fb, index) => (
          <div
            key={index}
            className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-100">
              <img
                className="h-12 w-12 rounded-full"
                src={fb.image}
                alt={fb.name}
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">{fb.name}</h1>
                <p className="text-gray-800/80">{fb.role}</p>
              </div>
            </div>
            <div className="p-5 pb-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.floor(fb.rating) ? assets.star : assets.star_blank
                    }
                    alt="star"
                    className="w-3.5 h-3.5"
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-5">{fb.feedback}</p>
            </div>
            <a href="#" className="text-blue-500 underline px-5">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedBackSection;
