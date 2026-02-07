import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    key: "location",
    array: ["Delhi NCR", "Noida", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    key: "industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
    ],
  },
  {
    filterType: "Salary",
    key: "salary",
    array: ["0-40k", "42-lakh", "1 Lakh to 5 Lakh"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    salary: "",
  });

  const changeHandler = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    dispatch(setSearchQuery(filters));
    console.log("FILTERS 👉", filters);
  }, [filters, dispatch]);

  return (
    <div className="p-4 border rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 mb-4" />

      {filterData.map((item) => (
        <div key={item.key} className="mb-4">
          <h2 className="font-semibold mb-2">{item.filterType}</h2>

          <RadioGroup
            value={filters[item.key]}
            onValueChange={(value) =>
              changeHandler(item.key, value)
            }
          >
            {item.array.map((data, index) => (
              <div key={index} className="flex items-center gap-2">
                <RadioGroupItem
                  value={data}
                  id={`${item.key}-${index}`}
                />
                <label htmlFor={`${item.key}-${index}`}>
                  {data}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;