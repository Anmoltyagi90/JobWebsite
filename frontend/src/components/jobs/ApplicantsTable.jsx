import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../../utils/constant.js";
import axios from "axios";
import { toast } from "sonner";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  console.log("Applicants Redux Data:", applicants);
  console.log("Applictations:", applicants?.applications);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants &&
            applicants?.applications?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item?.applicant?.fullName || "N/A"}</TableCell>
                <TableCell>{item?.applicant?.email || "N/A"}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || "N/A"}</TableCell>

                <TableCell className="text-blue-600">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>

                <TableCell>
                  {new Date(item?.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, i) => (
                        <div
                          onClick={() => statusHandler(status, item._id)}
                          key={i}
                          className="cursor-pointer my-2 hover:text-blue-600"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
