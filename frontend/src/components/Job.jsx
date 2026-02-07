import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dayAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffernce = currentTime - createdAt;
    return Math.floor(timeDiffernce / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition-all">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {dayAgo(job?.createdAt) === 0 ? "Today" : `${dayAgo(job?.createdAt)}`}{" "}
          days ago
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-4">
        <Button className="p-6" size="icon" variant="outline">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>

        <div>
          <h1 className="font-semibold text-gray-900">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Details */}
      <div>
        <h1 className="font-bold text-lg mb-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 my-3">
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

      <div>
        <Button
          variant="outline"
          className="cursor-pointer mr-2"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>

        <Button
          variant="outline"
          className="bg-purple-600 text-white cursor-pointer"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
