import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "../../redux/jobSlice.js";
import { JOB_API_END_POINT } from "../../utils/constant.js";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });

        console.log("API RESPONSE:", res.data);

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("FETCH JOB ERROR:", error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
