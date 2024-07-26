import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const HorizontalScrollCard = ({ data = [], heading ,trending,media_type }) => {
  // here props should always be passed in the curly braces --> FUCKING IMP

  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
    // scrolling left side by 300px
    // continerRef is used to take the refrence of the component
  };

  const handlePrevious = () => {
    containerRef.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
        {heading}
      </h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll overflow-hidden z-10 relative scroll-smooth transition-all scrollbar-none"
        >
          {/* sscrollbar-none --> defined in app.css */}
          {/* without using relative here we will not be able to scroll */}
          {/* grid-flow-col --> used to display all the items in a row */}
          {/* grid-cols-[repeat(auto-fit,230px)] --> used to set the cards in the colums and repeat the same in next line*/}
          {/* here each card will have a min width of 230px */}
          {
            data.map((data, index) => {
            return (
              <Card
                key={data.id + "heading" + index}
                data={data}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            );
          })}
        </div>

        <div className="absolute top-0 hidden lg:flex justify-between h-full w-full items-center">
          <button
            onClick={handlePrevious}
            className="bg-white p-1 text-black rounded-full -ml-2 z-10"
          >
            {/* without using z index it will display under the poster */}
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-2 z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
