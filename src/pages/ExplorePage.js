import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  //use params hook is used to access the params of the current route
  //used when we need the dynamic value from the route

  const [pageNo, setPageNo] = useState(1);
  // there is infinite no of data so multiple pages

  const [data, setData] = useState([]);
  //here we will store the data

  const [totalPageNo, setTotalPageNo] = useState(0);
  //there may be infinite no of pages there may we some stopping condition
  //for this purpose we are taking this variable

  console.log("params", params.explore);

  const fetchData = async () => {
    try {
      //here we are dynamically changing the path using `` and $ symbols
      //there are more infinite no of data we will scroll and scroll so we need the api multiple times and load the data
      //so we require more params...
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });
      //once we get the data then we need to set the data
      setData((preve) => {
        //taking the previous data and spreading it and then spreading the new data
        // new data will come from the different page so we took the useState for page
        return [...preve, ...response.data.results];
      });

      setTotalPageNo(response.data.total_pages);
      console.log("response", response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  //whenever we do the scroll
  const handleScroll = () => {
    //window.innerHeight -> The height of the viewport
    //window.scrollY -> The number of pixels the document has already been scrolled vertically.
    //document.body.offsetHeight -> The total height of the document, including the part that is not currently visible.
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((preve) => preve + 1);
    }
  };

  //whenever the page changes we need to call the api again and again
  useEffect(() => {
    fetchData();
  }, [pageNo]);

  //whenever there is the scroll we need to call the function
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });


  //this is for the movies sectiion
  //when we click on movies the params.explore changes so we need to againn fetch the data
  //we need to do some prerequisites before fetching
  //as there may be tv data present in the ary and display the same data
  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  },[params.explore])

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-2">
          Popular {params.explore} shows
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((exploreData, index) => {
            return (
              <Card
                data={exploreData}
                key={exploreData.id + "exploreSection"}
                media_type={params.explore}
                // here media_type represents the tv/movies/banner header section
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
