import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="my-4 rounded-xl border bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 cursor-pointer"
    >
      {/* Company Info */}
      <div className="mb-3">
        <h1 className="text-lg font-semibold text-gray-800">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">📍 India</p>
      </div>

      {/* Job Info */}
      <div className="mb-4">
        <h1 className="text-base font-medium text-gray-900">{job?.title}</h1>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Job Tags */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="ghost"
          className="text-blue-700 font-semibold bg-blue-50"
        >
          {job?.position} Positions
        </Badge>

        <Badge variant="ghost" className="text-red-700 font-semibold bg-red-50">
          {job?.jobType}
        </Badge>

        <Badge
          variant="ghost"
          className="text-purple-700 font-semibold bg-purple-50"
        >
          {job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
