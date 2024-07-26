//import data in a fucking proper manner else gone --> FUCKING IMP

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import useFetch from "../hooks/useFetch";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import VideoPlay from "../components/VideoPlay";

const DetailsPage = () => {
  const params = useParams();
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  //here we are extracting the data property form the useFetchDetails
  //explore --> tv/movie
  //id --> movie id

  const imageURL = useSelector((state) => state.movieoData.imageURL);

  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".");
  //this is basically used to store the time
  //it will store the time in form of arrays

  //console.log("data", data);

  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  //here we are declaring the new variable castData and assing it to data
  //basically the properties of data will be stored in the cast data

  //
  console.log("cast data", castData);

  //here we are getting similar data to the movie or the tv show
  //getting data and storing it into the similarData
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );

  //getting the data for recommendation
  const { data: recommendationData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );

  //console.log("type of" , typeof(similarData))

  // console.log("similar data", similarData);

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

const handlePlayVideo = (data) => {
  setPlayVideoId(data)
  setPlayVideo(true)
}

  const writer = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el.name)
    .join(" ");
  //console.log("writer", writer);
  //here we are targeting the writer
  //first of all getting the writerr info by applying filterr --> object/aray
  //and then apply map on ary and get the name and --> ary
  //then perform join operation

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            //here we have to use + and not dot as imageURL is accessing the store
            //we are adding image data to the imageURL
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={imageURL + data?.poster_path}
            className="h-80 w-60 object-cover rounded"
          />
          <button onClick={() => handlePlayVideo(data)} className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:scale-105 transition-all">
            Play now
          </button>
        </div>

        <div className="">
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {/* Questions marks are fucking important */}
            {data?.original_name ||
              data?.original_title ||
              data?.name ||
              data?.title ||
              "name not found"}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>

          <Divider />
          {/* here divider component is used to add the divisions */}
          <div className="flex items-center gap-3">
            <p>
              Rating : {Number(data?.vote_average).toFixed(1)}+
              {/* here tofixed is used to get only one decimal point */}
            </p>
            <span>|</span>
            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>

            <p>
              Duration : {duration[0]}hrs {duration[1]}min
            </p>
          </div>

          <Divider />

          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>
          </div>
          <Divider />

          <div className="flex items-center gap-3 my-3 text-center">
            <p>Status : {data?.status}</p>
            <span>|</span>
            <p>
              Release Date : {moment(data?.release_date).format("MMMM Do YYYY")}
            </p>
            <span>|</span>

            <p>Revenue : {Number(data?.revenue)}</p>
          </div>
          <Divider />
          <div>
            <p>
              <span className="text-white">Director</span> :{" "}
              {castData?.crew[0]?.name}
            </p>
            <Divider />

            <p>
              <span className="text-white">
                Writter : {writer || "Not Available"}
              </span>
            </p>
          </div>
          <Divider />
          <h2 className="font-bold">Cast : </h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
            {/* here we are taking the images of the actors */}
            {
              //filter --> if no image is present there is no need to display
              castData?.cast
                .filter((el) => el.profile_path)
                .map((cast, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <img
                          src={imageURL + cast?.profile_path}
                          className="w-24 h-24 object-cover rounded-full"
                        />
                      </div>
                      <p className="font-bold text-center text-sm text-neutral-400">
                        {cast.name}
                      </p>
                    </div>
                  );
                })
            }
          </div>
        </div>
      </div>
      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />

        <HorizontalScrollCard
          data={recommendationData}
          heading={"Recommedation " + params?.explore}
          media_type={params?.explore}
        />
      </div>
      {playVideo && (
        <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />
      )}
    </div>
  );
};

export default DetailsPage;
