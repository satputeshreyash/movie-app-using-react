import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  //here we took an array for navigation components
  const navigation = [
    {
      label: "TV Shows",
      href: "tv",
    },
    {
      label: "Movies",
      href: "movie",
    },
  ];

  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  //here we are getting the url removing the starting 3 char from it and splitting it basically removing %20 and then joining with a space

  const [searchInput, setSearchInput] = useState(removeSpace);

  const navigate = useNavigate();

  useEffect(() => {
    //useNavigate hook is used to navigate between differnt routes
    //useful when we want to change the route in response to the use action
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  //by doing this will not reload the page again and again
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full bg-black bg-opacity-50 z-40">
      <div className="container mx-auto px-4 flex items-center h-full">
        <Link to="/">
          <img className="py-3" src={logo} alt="logo" width={120} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav, index) => {
            return (
              <div key={nav.label}>
                <NavLink
                  // key={nav.label}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-neutral-100 ${
                      isActive && "text-neutral-100"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              id="search"
            />
            <button className="text-2xl text-white">
              <label for="search">
                <FaSearch />
              </label>
            </button>
          </form>

          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all">
            <img src={userIcon} width="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
