import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAllAppliedJobs";

// const skills = ["HTML", "CSS", "JAVASCRIPT", "REACTJS"];

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  console.log("Redux user:", user);

  const isResume = true;
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPLg_sNCBrbTUBB3Ts_wPnm9vEJ68x9tVFOQ&s"
                className="w-full h-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {/* Edit button on avatar */}
            <Button
              variant="outline"
              size="sm"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow hover:bg-gray-50"
              onClick={() => setOpen(true)}
            >
              <Pen size={16} />
            </Button>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">
              {" "}
              {user?.fullName || "Loading..."}
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
             {user?.profile?.bio}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between my-5  gap-2">
          <div className="flex gap-2 items-center my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex gap-2 items-center my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Optional: Actions */}
        <div className="mt-6 flex gap-4">
          <Button className="bg-purple-500 hover:bg-purple-600 text-white">
            Edit Profile
          </Button>
          <Button variant="outline">Settings</Button>
        </div>

        <div className="my-4">
          <h1>Skills</h1>
          <div className="flex items-center gap-2 my-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((skill, index) => (
                <Badge key={index} className="px-3 py-1 space-x-1">
                  {skill}
                </Badge>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label className="text-md font-bold">Resume</Label>

          {isResume ? (
            <div className="flex gap-3">
              <a
                href="/AnmolTyagi2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user?.profile?.resumeOriginalName}
              </a>

              <a
                href={user?.profile?.resume}
                download
                className="text-green-600 hover:underline"
              >
                Download
              </a>
            </div>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>

      <div className="max-w-3xl my-5 mx-auto bg-white rounded-2xl">
        <h1 className="p-4 font-bold text-xl">Applied Jobs</h1>
        <AppliedJobTable />
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
