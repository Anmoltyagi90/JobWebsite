import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./pages/Jobs";
import { Browse } from "./components/Browse";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth.js";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import RegisterCompany from "./components/company/RegisterCompany";
import Companies from "./components/company/Companies";
import CompanyCreate from "./components/company/CompanyCreate";
import CompanySetup from "./components/company/CompanySetup";
import AdminJobs from "./components/jobs/AdminJobs";
import PostJob from "./components/jobs/PostJob";
import Applicants from "./components/jobs/Applicants";
import ProtectedRoute from "./components/jobs/ProtectedRoute.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "Browse",
    element: <Browse />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/company/register",
    element: <RegisterCompany />,
  },
  {
    path: "/admin/companies",
    element: (
        <Companies />
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
        <AdminJobs />
    ),
  },
  {
    path: "/admin/jobs/:id",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants />,
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch(
          setUser({
            token,
            user: parsedUser,
          }),
        );
      } catch (e) {
        // If stored data is corrupted, clear it so app doesn't crash
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
