import FilterCard from "@/components/FilterCard";
import Footer from "@/components/Footer";
import Job from "@/components/Job";
import Navbar from "@/components/shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.jobs);
  useGetAllJobs();

  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    let filtered = allJobs;

    if (searchedQuery?.location) {
      filtered = filtered.filter((job) =>
        job.location
          ?.toLowerCase()
          .includes(searchedQuery.location.toLowerCase())
      );
    }

    if (searchedQuery?.industry) {
      filtered = filtered.filter((job) =>
        job.title
          ?.toLowerCase()
          .includes(searchedQuery.industry.toLowerCase())
      );
    }

    if (searchedQuery?.salary) {
      filtered = filtered.filter(
        (job) => job.salary === searchedQuery.salary
      );
    }

    setFilterJobs(filtered);
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>

          <div className="flex-1">
            {filterJobs.length === 0 ? (
              <span>Job not Found</span>
            ) : (
              <div className="h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filterJobs.map((job) => (
                    <Job key={job._id} job={job} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;