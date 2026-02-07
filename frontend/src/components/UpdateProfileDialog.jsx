import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/auth.js";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant.js";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null || "",
  });

  const onChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, file });
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    setLoading(true);

    const formData = new FormData(); // ✅

    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${USER_API_END_POINT}/updateprofile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
    setLoading(false)
    }

    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right font-medium">
              Name
            </Label>
            <Input
              id="name"
              name="fullName"
              className="col-span-3"
              value={input.fullName}
              onChange={onChangeEventHandler}
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="example@email.com"
              className="col-span-3"
              onChange={onChangeEventHandler}
              value={input.email}
            />
          </div>

          {/* Number */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right font-medium">
              Number
            </Label>
            <Input
              id="number"
              name="phoneNumber"
              type="number"
              placeholder="9876543210"
              className="col-span-3"
              value={input.phoneNumber}
              onChange={onChangeEventHandler}
            />
          </div>

          {/* Bio */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right font-medium">
              Bio
            </Label>
            <Input
              id="bio"
              name="bio"
              placeholder="Frontend Developer"
              className="col-span-3"
              value={input.bio}
              onChange={onChangeEventHandler}
            />
          </div>

          {/* Skills */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right font-medium">
              Skills
            </Label>
            <Input
              id="skills"
              name="skills"
              placeholder="React, JavaScript, Tailwind"
              className="col-span-3"
              value={input.skills}
              onChange={onChangeEventHandler}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right font-medium">
              Resume
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              className="col-span-3"
              onChange={fileChangeHandler}
            />
          </div>

          <DialogFooter className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Update"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
