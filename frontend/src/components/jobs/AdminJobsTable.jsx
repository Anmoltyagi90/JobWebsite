import React, { useEffect, useState } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchjobByText } = useSelector((store) => store.jobs);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchjobByText) {
      setFilterJobs(allAdminJobs);
      return;
    }

    const filtered = allAdminJobs.filter(
      (job) =>
        job?.title?.toLowerCase().includes(searchjobByText.toLowerCase()),
      // job.company?.name,
    );

    setFilterJobs(filtered);
  }, [allAdminJobs, searchjobByText]);

  return (
    <Table>
      <TableCaption>A list of your recent posted jobs</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filterJobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No jobs found
            </TableCell>
          </TableRow>
        ) : (
          filterJobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.company?.name || "N/A"}</TableCell>

              <TableCell>{job.title}</TableCell>

              <TableCell>
                {new Date(job.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AdminJobsTable;
