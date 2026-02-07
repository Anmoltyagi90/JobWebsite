import React, {useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/auth.js";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const disptach = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // ✅ Capital F & D

    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      disptach(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
          onSubmit={onSubmitHandler}
          className="w-1/2 border border-gray-400 rounded-md p-4 my-15 bg-white shadow-md space-y-3"
        >
          <h1 className="text-xl font-bold mb-5">Signup</h1>

          <div>
            <Label>FullName</Label>
            <input
              type="text"
              placeholder="Anmol Tyagi"
              className="w-full p-3 border-2 rounded-xl outline-none focus:ring-1 bg-white transition duration-200 mt-2"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Email</Label>
            <input
              type="email"
              placeholder="anmoltyagi123@gmail.com"
              className="w-full p-3 border-2 rounded-xl outline-none focus:ring-1 bg-white transition duration-200 mt-2"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <input
              type="number"
              placeholder="999999999999"
              className="w-full p-3 border-2 rounded-xl outline-none focus:ring-1 bg-white transition duration-200 mt-2"
              name="phoneNumber"
              value={input.phoneNumber}
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

              <div className="flex items-center gap-4 w-full mt-4">
                <Label className="min-w-[70px]">Profile</Label>

                <div className="flex items-center gap-3 w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="w-full text-sm text-gray-600
                 file:mr-4 file:px-4 file:py-2
                 file:border-0 file:rounded-md
                 file:bg-gray-100 file:text-gray-700
                 hover:file:bg-gray-200
                 cursor-pointer"
                  />
                </div>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="my-3 w-full">
              <Loader2 className="w-4 mr-2 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <div className="text-center my-4">
              <Button type="submit" className="w-full cursor-pointer">
                Signup
              </Button>
            </div>
          )}

          <div>
            <p className="text-sm">
              Already have an Account ?{" "}
              <Link to="/login" className="text-blue-700 underline">
                Login
              </Link>
            </p>
          </div>

          <div>
            {/* <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignup}
            >
              Continue with Google
            </Button> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
