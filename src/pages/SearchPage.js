import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";

const SearchPage = () => {
  const location = useLocation();
  //useLocation is used to access the current location object --> url

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const query = location?.search?.slice(3);

  const fetchData = async () => {
    try {
      //here we are calling the api for searching the elements
      // /search.multi is also used to to get the type of the content in the url section
      const response = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          //here in location we are getting the url and removing the 3 char from the start from it
          page: page,
        },
      });
      //once we get the data then we need to set the data
      setData((preve) => {
        //taking the previous data and spreading it and then spreading the new data
        return [...preve, ...response.data.results];
      });

      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    //if conditionn for the situation when you directly click on the movies tag or the search tag
    if (query) {
      setPage(1);
      //when search field change we need to set page to 1 and setData to empty
      setData([]);
      fetchData();
    }
  }, [location?.search]);

  //whenever we do the scroll
  const handleScroll = () => {
    //window.innerHeight -> The height of the viewport
    //window.scrollY -> The number of pixels the document has already been scrolled vertically.
    //document.body.offsetHeight -> The total height of the document, including the part that is not currently visible.
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((preve) => preve + 1);
    }
  };

  //whenever we scroll the page changes then we need to call teh api again
  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page]);

  //here we are adding listener to scroll and then calling function handleScroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  //console.log("location",location)
  return (
    <div className="py-16">
      {/* this search  bar is for the mobile version */}
      <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          // here in the navigate section the '/' is very important!
          value={query?.split('%20')?.join(" ")}
          className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
        />
      </div>
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Search results
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {/* in mobile we need the content at centre and for lg divices it will be displayed from the start */}
          {data.map((searchData, index) => {
            return (
              <Card
                data={searchData}
                key={searchData.id + "search"}
                media_type={searchData.media_type}
                //here mediatype is randomly coming so we need to access it through dot operator
                // here media_type represents the tv/movies/banner header section
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
