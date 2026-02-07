import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div className="max-w-4xl mx-auto px-4 text-center my-20">
      <div className="flex flex-col items-center gap-6">
        <span className="bg-gray-100 text-orange-600 px-5 py-2 rounded-full text-md font-semibold tracking-wide shadow-sm">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
          Search, Apply & <br />
          Get Your{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Dream Jobs
          </span>
        </h1>

        <p className="max-w-2xl text-gray-600 text-base md:text-lg leading-relaxed">
          Find your dream job from thousands of listings. Apply easily and take
          the next step in your career with confidence.
        </p>

        <div className="w-full max-w-2xl mt-4">
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full shadow-lg focus-within:ring-2 focus-within:ring-purple-500 transition">
            <Search className="ml-4 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search jobs, skills, or companies..."
              className="w-full px-4 py-3 outline-none rounded-full bg-gray-100 text-gray-700 placeholder-gray-500"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={searchJobHandler}
              className="mr-2 px-6 py-2 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
