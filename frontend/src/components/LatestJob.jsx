import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const LatestJob = () => {
  const { allJobs } = useSelector((store) => store.jobs);
  useGetAllJobs();

  return (
    <div className="max-w-5xl mx-auto my-24">
      <h1 className="text-4xl font-bold">
        <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Latest & Top{" "}
        </span>
        Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {allJobs.length === 0 ? (
          <span className="text-gray-500">No Jobs Available</span>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <LatestJobCards key={job._id || index} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJob;
