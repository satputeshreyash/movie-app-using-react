import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerData } from "./store/movieoSlice";
import { setImageURL } from "./store/movieoSlice";

function App() {
  //whenever we want to call any function using react then we need to use useDispatch hook
  const dispatch = useDispatch();
  //usedispatch is used to dispatch actions and how the changes should be performed in the store

  //here we are fetching the data
  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      dispatch(setBannerData(response.data.results));
      //console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  //The data returned here in the configuration endpoint is designed to provide some of the required information
  // you'll need as you integrate our API.
  //bascically we need images and stuff
  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageURL(response.data.images.secure_base_url + 'original'));
      //console.log("configuration data", response.data.images.secure_base_url + 'original');
      //here we are basically taking the image data form configuration by digging into it
      //original is the size -->dig and see it!
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);
  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>

      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
