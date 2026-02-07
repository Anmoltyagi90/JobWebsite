import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading, setUser } from "../../../redux/auth.js";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    role: "",
    password: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const disptach = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Login Input:", input); // 👈 ADD THIS

    try {
      disptach(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        disptach(
          setUser({
            user: res.data.user,
            token: res.data.token,
          }),
        );
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      disptach(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-400 rounded-md p-4 my-15 bg-white shadow-md space-y-3"
        >
          <h1 className="text-xl font-bold mb-5">Login</h1>

          <div>
            <Label>Email</Label>
            <input
              type="email"
              placeholder="anmoltyagi123@gmail.com"
              className="w-full p-3 border-2 rounded-xl outline-none focus:ring-1 bg-white transition duration-200 mt-2"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Password</Label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 border-2 rounded-xl outline-none focus:ring-1 bg-white transition duration-200 mt-2"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex items-center justify-between mt-6 my-6">
            <RadioGroup
              defaultValue="comfortable"
              className="flex items-center justify-between space-x-3"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="text-black">
                  Student
                </Label>
              </div>

              <div className="flex items-center justify-between">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="my-4 w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <div className="text-center my-4">
              <Button type="submit" className="w-full cursor-pointer">
                SignIn
              </Button>
            </div>
          )}

          <div>
            <p className="text-sm">
              Don't have an Account ?{" "}
              <Link to="/signup" className="text-blue-700 underline">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
