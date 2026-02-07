import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend developer",
  "Backend developer",
  "Data Science",
  "Graphic Designer",
  "FullStack developer",
];


const CategoryCarousal = () => {
  const [query , setQuery]=useState()
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((item, index) => {
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                <Button
                  variant="outline"
                  className="rounded-full cursor-pointer"
                  onClick={() => searchJobHandler(item)}
                >
                  {item}
                </Button>
              </CarouselItem>
            );
          })}
          Z
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousal;
