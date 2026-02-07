import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../../redux/jobSlice.js";
import { COMPANY_API_END_POINT } from "../../utils/constant.js";
import { setSingleCompany } from "../../redux/companySlice.js";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          },
        );

        console.log("API RESPONSE:", res.data.company);

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error("FETCH JOB ERROR:", error);
      }
    };

    fetchSingleCompany();
  }, [dispatch]);
};

export default useGetCompanyById;
