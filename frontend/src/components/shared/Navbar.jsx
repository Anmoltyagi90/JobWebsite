import React, { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Menu, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth";
import { toast } from "sonner";

const Navbar = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logout());

    setOpen(false);

    navigate("/login");
    // toast.success()
  };

  return (
    <div>
      <div className="flex items-center justify-between max-w-5xl mx-auto h-16">
        <div>
          <h1 className="text-xl font-bold p-4">
            Job<span className="text-orange-500">Portal</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex gap-4 font-semibold">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link href="#" to="/admin/jobs">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link href="#" to="/jobs">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" to="/Browse">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Button className="bg-purple-500 hover:bg-purple-700 cursor-pointer">
                <Link to="/signup">
                  <Button className="bg-purple-500 hover:bg-purple-700 cursor-pointer">
                    SignUp
                  </Button>
                </Link>
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    className="cursor-pointer"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent align="end" side="bottom" className="w-80">
                <div className="flex-col items-center space-y-4">
                  <div className="flex gap-5">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        className="cursor-pointer"
                      />
                    </Avatar>
                    <div>
                      <h1 className="font-semibold">{user?.fullName}</h1>
                      <p className="truncate w-50">{user?.profile?.bio}</p>
                    </div>
                  </div>

                  {user && user.role === "student" && (
                    <div className="flex items-center gap-5">
                      <User size={25} className="cursor-pointer" />
                      <Button
                        variant="link"
                        className="no-underline hover:no-underline cursor-pointer"
                      >
                        <Link to="/profile">View profile</Link>
                      </Button>
                    </div>
                  )}

                  <div
                    className="flex w-ft items-center cursor-pointer gap-5"
                    onClick={logoutHandler}
                  >
                    <LogOut size={25} className="cursor-pointer" />

                    <Button
                      variant="link"
                      className="no-underline hover:no-underline cursor-pointer"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="md:hidden p-4">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-4 p-4 font-semibold">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Browse</a>
            </li>
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2 p-4">
              <Button variant="outline" className="cursor-pointer w-full">
                Login
              </Button>
              <Button className="bg-purple-500 hover:bg-purple-700 cursor-pointer w-full">
                SignUp
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-4">
              <div className="flex gap-5 items-center">
                <Avatar>
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    className="cursor-pointer"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-semibold">Anmoltyagi</h1>
                  <p className="truncate w-50">
                    Lorem ipsum dolor sit amet.....
                  </p>
                </div>
              </div>
              <Button
                variant="link"
                className="no-underline hover:no-underline cursor-pointer"
              >
                View profile
              </Button>
              <Button
                variant="link"
                className="no-underline hover:no-underline cursor-pointer"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
