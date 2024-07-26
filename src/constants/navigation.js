import { FaHome } from "react-icons/fa";
import { PiTelevisionFill } from "react-icons/pi";
import { MdLocalMovies } from "react-icons/md";
import { FaSearch } from "react-icons/fa";


//here we took an array for navigation components
export const navigation = [
    {
      label: "TV Shows",
      href: "tv",
      icon:<PiTelevisionFill />
    },
    {
      label: "Movies",
      href: "movie",
      icon:<MdLocalMovies />
    },
  ];

  export const mobileNavigation =[
    {
        label:"Home",
        href: "/",
        icon: <FaHome />
    },
    ...navigation, //here we are using spread operator 
    {
        label:"search",
        href:"/search",
        icon:<FaSearch />
    }
  ]

  