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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTables = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchCompanyByText) {
      setFilterCompany(companies);
      return;
    }

    const filteredCompany = companies.filter((company) =>
      company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase())
    );
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="rounded-xl border bg-white shadow-sm mt-5">
      <Table>
        <TableCaption className="text-sm text-muted-foreground mb-5">
          A list of your registered companies
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-20">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-gray-500"
              >
                {companies?.length === 0
                  ? "You haven't registered any company yet."
                  : "No companies match your search"}
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition"
              >
                <TableCell>
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage
                      src={company.logo || "/logo.jpg"}
                      className="object-cover"
                    />
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium">
                  {company.name}
                </TableCell>

                <TableCell className="text-sm text-gray-600">
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-md hover:bg-gray-100">
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-32 p-2">
                      <div
                        className="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100"
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                      >
                        <Edit2 className="w-4" />
                        <span className="text-sm">Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTables;
