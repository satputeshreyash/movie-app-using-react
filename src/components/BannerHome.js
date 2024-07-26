import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BannerHome = () => {
  //here we are taking the banner data
  //pointing to bannerData of the store
  const bannerData = useSelector((state) => state.movieoData.bannerData);

  //here we are taking the image data
  //pointing to imageURL of the store
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  //useSelector accepts a call back function
  //state --> (state) -> function
  // => ke bad vala defination he
  //   use selector is basically used to access components in the store
  //console.log("banner home", bannerData);

  const [currentImage, setCurrentImage] = useState(0);
  //this state is used to get the current image
  //changing the state will give the different images
  //below we have applied the style transform

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
      // here in prev there will be the current value of the currentImage
    }
  };

  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
      // here in prev there will be the current value of the currentImage
    }
  };

  //to automatically change image
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        //this logic is important
        
        handleNext()
      }
      else{
        setCurrentImage(0)
      }
    }, 5000);
    //after every 2sec it will change the image

    return ()=>clearInterval(interval)
//clear interval to prevent the memory leaks

  }, [bannerData, imageURL,currentImage]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => {
          return (
            <div
              key={data.id + "bannerHome" + index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              {/* here transform is used to change the image on the hitting on thea arrow button */}
              {/* here we have group cls to get the next/prev button */}
              {/* "-" sign --> will move the current element to left */}
              <div className="w-full h-full image">
                <img
                  src={imageURL + data.backdrop_path}
                  className="h-full w-full object-cover"
                  alt={data.title || data.name}
                />
                {/* backdrop_path is basically used in the context of movie or media */}
                {/* contains file path to load the image without it we cannot load the image */}
              </div>

              {/* previous and next button */}
              <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex">
                {/* here ww have group-hover so as to apply hover effect to the buttons */}
                {/* previously buttons were hidden and when we hover it we will be able to see the buttons */}
                <button
                  className="bg-white p-1 rounded-full text-xl z-10 text-black"
                  onClick={handlePrev}
                >
                  <FaAngleLeft />
                </button>
                <button
                  className="bg-white p-1 rounded-full text-xl z-10 text-black"
                  onClick={handleNext}
                >
                  <FaAngleRight />
                </button>
              </div>

              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent">
                {/* Content goes here */}
              </div>



             
              


              <div className="container mx-auto">
                <div className=" absolute bottom-0 max-w-md px-3">
                  <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                    {data?.title || data?.name}
                    {/* if title not available we should display the name */}
                  </h2>
                  <p className="text-ellpsis line-clamp-3 my-2">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <p>Rating : {Number(data.vote_average).toFixed(1)} + </p>
                    {/* tofixed is used to take what amout of o/p should be take afterr decimal point */}
                    {/* here in our case we are taking one decimal point!! */}
                    <span>|</span>
                    <p>View : {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <Link to={"/" + data?.media_type + "/" + data.id}>
                  <button className="bg-white px-4 py-2 text-black font-bold mt-4 hover:scale-105">
                    Play now
                  </button>
                </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
};

export default BannerHome;
