import React, { useEffect, useState } from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import axios from 'axios'
import useFetch from "../hooks/useFetch";

const Home = () => {
  const trendingData = useSelector((state) => state.movieoData.bannerData);
  //trending data and the banner data are the same so the

  //const bannerData = useSelector(state => state.movieoData.bannerData)//console log and see
  //remove some of the components in tthe state.movieoData.bannerData and see
  //console.log('shreyash data',bannerData);
  //state.movieodata.bannerdata --> specifies store

//excessing data property of the useFetch.js
// here we are fetching the data
  const {data : nowPlayingData} = useFetch('/movie/now_playing')

  const {data : topRated} = useFetch('/movie/top_rated')

  const {data : popolarTvShowData} = useFetch('/tv/popular')

  const {data : onTheAirShowData} = useFetch('/tv/on_the_air')




  
  return (
    <div>
      <BannerHome />

      <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true} />

      <HorizontalScrollCard data={nowPlayingData} heading={"Now playing"} media_type={"movie"} />

      <HorizontalScrollCard data={topRated} heading={"Top rated"} media_type={"movie"} />

      <HorizontalScrollCard data={popolarTvShowData} heading={"popular Tv Shows"} media_type={"tv"}/>

      <HorizontalScrollCard data={onTheAirShowData} heading={"On The Air"} media_type={"tv"}/>





    </div>
  );
};

export default Home;
