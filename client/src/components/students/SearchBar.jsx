// import React, { useState } from "react";
// import { assets } from "../../assets/assets";
// import { useNavigate } from "react-router-dom";

// const SearchBar = ({data}) => {
//     const navigate = useNavigate();
//     const [input, serInput] = useState(data ? data : '');
//     const onSearchHandler = (e) => {
//         e.preventDefault()
//         navigate('/course-list/'+input);
//     }
//   return (
//     <form onSubmit={onSearchHandler}
//     className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded">
//       <img
//         src={assets.search_icon}
//         alt="Search Icon"
//         className="md:w-auto w-10 px-3"
//       />
//       <input
//         onChange={(e)=> serInput(e.target.value)}
//         value = {input} 
//         type="text"
//         placeholder="Search for courses"
//         className="w-full h-full outline-none text-gray-500/80"
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1"
//       >
//         Search
//       </button>
//     </form>
//   );
// };

// export default SearchBar;
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

const SearchBar = ({ data, setSearchParams }) => {
  const [input, setInput] = useState(data || "");

  useEffect(() => {
    setInput(data || "");
  }, [data]);

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setSearchParams({ q: input.trim() });
    }
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded"
    >
      <img
        src={assets.search_icon}
        alt="Search Icon"
        className="md:w-auto w-10 px-3"
      />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search for courses"
        className="w-full h-full outline-none text-gray-500/80"
      />
      <button
        type="submit"
        className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
