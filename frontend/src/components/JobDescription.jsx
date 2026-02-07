import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../../utils/constant.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJobs } from "../../redux/jobSlice.js";
import { toast } from "sonner";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.jobs);

  const isIntiallyApplied =
    !!user &&
    Array.isArray(singleJob?.applications) &&
    singleJob.applications.some((application) => {
      const applicantId =
        application?.applicant?._id || application?.applicant || null;
      return applicantId === user._id;
    });

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const param = useParams();
  const dispatch = useDispatch();

  const jobId = param.id;

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        },
      );
      console.log("Apply response:", res.data);
      if (res.data.success) {
        setIsApplied(true);
        const updateSinglejob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user._id }],
        };
        dispatch(setSingleJobs(updateSinglejob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        console.log("API response:", res.data);

        if (res.data.success) {
          dispatch(setSingleJobs(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user._id,
            ),
          ); 
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const job = singleJob;

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{job?.title}</h1>

          <div>
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {job?.position} Positions
            </Badge>

            <Badge className="text-red-700 font-bold" variant="outline">
              {job?.jobType}
            </Badge>

            <Badge className="text-indigo-600 font-bold" variant="outline">
              {job?.experienceLevel} Years
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          variant="outline"
          className={`rounded-lg px-6 ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-5">
        Job Description
      </h1>

      <div>
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-medium text-gray-800">{job?.title}</span>
        </h1>

        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-medium text-gray-800">
            {job?.location}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-medium text-gray-800">
            {job?.description}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-medium text-gray-800">
            {job?.experienceLevel} Years
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-medium text-gray-800">{job?.salary}</span>
        </h1>

        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-medium text-gray-800">
            {Array.isArray(job?.applications) ? job.applications.length : 0}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-medium text-gray-800">
            {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : ""}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
