import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.jobs);

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right pr-5">Status</TableHead>
        </TableRow>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>you haven't applied any job yet</span>
          ) : (
            allAppliedJobs.map((appliedJob) => {
              return (
                <TableRow key={appliedJob?._id}>
                  <TableCell>{appliedJob.createdAt.split("T")}</TableCell>
                  <TableCell>{appliedJob.job?.title}</TableCell>
                  <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`text-white ${
                        appliedJob?.status === "rejected"
                          ? "bg-red-500"
                          : appliedJob?.status === "pending"
                            ? "bg-gray-400"
                            : "bg-green-500"
                      }`}
                    >
                      {appliedJob?.status?.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
