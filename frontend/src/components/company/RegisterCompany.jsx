import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../../../utils/constant";

const RegisterCompany = () => {
  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first to register a company");
      navigate("/login");
      return;
    }

    if (!input.companyName || !input.description || !input.file) {
      toast.error("Company name, description, and logo are required");
      return;
    }

    const formData = new FormData();
    formData.append("companyName", input.companyName);
    formData.append("description", input.description);
    if (input.website) {
      formData.append("website", input.website);
    }
    if (input.location) {
      formData.append("location", input.location);
    }
    formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setInput({
          companyName: "",
          description: "",
          website: "",
          location: "",
          file: null,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Company Registration Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to register company"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto min-h-screen py-10">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-2xl border border-gray-400 rounded-md p-6 bg-white shadow-md space-y-4"
        >
          <h1 className="text-2xl font-bold mb-6">Register Your Company</h1>

          <div>
            <Label htmlFor="companyName" className="text-base font-medium">
              Company Name *
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="e.g., Tech Solutions Inc."
              className="w-full p-3 border-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 bg-white transition duration-200 mt-2"
              name="companyName"
              value={input.companyName}
              onChange={changeEventHandler}
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-base font-medium">
              Description *
            </Label>
            <textarea
              id="description"
              placeholder="Tell us about your company..."
              className="w-full p-3 border-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 bg-white transition duration-200 mt-2 min-h-[120px] resize-y"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              required
            />
          </div>

          <div>
            <Label htmlFor="website" className="text-base font-medium">
              Website
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="https://www.example.com"
              className="w-full p-3 border-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 bg-white transition duration-200 mt-2"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-base font-medium">
              Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., New York, USA"
              className="w-full p-3 border-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 bg-white transition duration-200 mt-2"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label htmlFor="logo" className="text-base font-medium">
              Company Logo *
            </Label>
            <div className="flex items-center gap-3 w-full max-w-md border-2 border-gray-300 rounded-lg px-3 py-2 bg-white mt-2">
              <input
                id="logo"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full text-sm text-gray-600
                 file:mr-4 file:px-4 file:py-2
                 file:border-0 file:rounded-md
                 file:bg-gray-100 file:text-gray-700
                 hover:file:bg-gray-200
                 cursor-pointer"
                required
              />
            </div>
            {input.file && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {input.file.name}
              </p>
            )}
          </div>

          {loading ? (
            <Button className="w-full mt-6" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering Company...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 bg-purple-500 hover:bg-purple-700 cursor-pointer"
            >
              Register Company
            </Button>
          )}

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already registered?{" "}
              <Link to="/" className="text-purple-600 hover:underline">
                Go to Home
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterCompany;

