import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { setSearchQuery } from "../../redux/jobSlice";

export const Browse = () => {
  useGetAllJobs();

  const { allJobs } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10">
        <h1 className="text-xl my-10 font-bold">
          Search Result ({allJobs?.length || 0})
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-3">
          {allJobs?.length === 0 ? (
            <span className="text-gray-500">No Jobs Available</span>
          ) : (
            allJobs.map((job) => <Job key={job._id} job={job} />)  
          )}
        </div>
      </div>
    </div>
  );
};
