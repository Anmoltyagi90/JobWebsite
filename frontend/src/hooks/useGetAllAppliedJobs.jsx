import axios from "axios";
import { useEffect } from "react";
import { APPLICATION_API_END_POINT } from "../../utils/constant.js";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "../../redux/jobSlice.js";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJob = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/get`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch applied jobs"
        );
      }
    };

    fetchAppliedJob();
  }, []);
};

export default useGetAppliedJobs;
