import CategoryCarousal from "@/components/CategoryCarousal";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LatestJob from "@/components/LatestJob";
import Navbar from "@/components/shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recuriter") {
      navigate("/admin/companies");
    }
  }, [navigate, user?.role]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousal />
      <LatestJob />
      <Footer />
      <Outlet />
    </div>
  );
};

export default Home;
