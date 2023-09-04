/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Icon } from "../assets/IconLibrary";
import { images } from "../assets/images/_images";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [homeToggle, setHomeToggle] = useState(false);
  const [storeToggle, setStoreToggle] = useState(false);
  const [stuffToggle, setStuffToggle] = useState(false);
  const [categoriesToggle, setCategoriesToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("movie");
  const inputRef = useRef();
  const navigate = useNavigate();
  const { logo } = images;
  const [toggleHeader, setToggleHeader] = useState(false);
  const [toggleClearAll, setToggleClearAll] = useState(false);
  const [headerHeight] = useState(60);

  const handleHeaderScroll = () => {
    if (window.scrollY > headerHeight) {
      setToggleHeader(true);
    } else {
      setToggleHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleHeaderScroll);
    return () => {
      window.removeEventListener("scroll", handleHeaderScroll);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(false);
      setSearchInput("");
      navigate(`/search/${selectedOption}`, { state: { searchInput } });
    }
  };

  return (
    <div
      className={`w-full flex justify-center pt-2 ${
        toggleHeader && "sticky top-0 z-20"
      }`}
      style={{ height: `${headerHeight}px` }}
    >
      <div
        className={`flex flex-row justify-between w-max items-center gap-4 text-lg lg:text-base font-semibold bg-black text-white tracking-wider relative z-50 h-full ${
          toggleHeader && "rounded-2xl border-2 border-slate-500"
        }`}
      >
        {/* LOGO */}
        <div className=" h-full">
          <Link to={`/`}>
            <img
              src={logo}
              alt="logo"
              className="h-full bg-black cursor-pointer rounded-l-2xl"
            />
          </Link>
        </div>

        {/* SEARCH BAR */}
        <div
          className={` hidden md:flex sm:hidden bg-slate-900 ${
            !toggleHeader && "border"
          } border-gray-100/50 rounded-xl  justify-start items-center p-2`}
        >
          <select
            value={selectedOption}
            className="text-white bg-inherit h-full"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="movie">Movie</option>
            <option value="tv_show">TV Shows</option>
          </select>

          <input
            type="text"
            ref={inputRef}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Search"
            className="bg-inherit pl-2"
            onClick={() => setToggleClearAll((prev) => !prev)}
          />
          <p
            className={`text-base font-semibold whitespace-nowrap cursor-pointer ${
              toggleClearAll ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => {
              setSearchInput("");
              inputRef.current.focus();
            }}
          >
            Clear All
          </p>
        </div>

        {/* NAVBAR */}
        <div className="flex justify-center items-center whitespace-nowrap w-1/2 z-50 h-full md:hidden">
          {/* HOME */}
          <div
            className="relative h-full"
            onMouseLeave={() => setHomeToggle(false)}
          >
            <div
              className={`cursor-pointer flex items-center px-3 h-full ${
                homeToggle && "border-b-4 border-white"
              }`}
              onMouseEnter={() => setHomeToggle(true)}
            >
              Home
              <Icon.rightArrow
                className={` ml-2 
            ${
              homeToggle ? "rotate-[270deg]" : "rotate-90"
            } transition-all duration-200`}
              />
            </div>

            {/* HOME OPTIONS */}

            {homeToggle && (
              <div className="absolute z-10 w-full  bg-slate-800 rounded-b-lg">
                <Link to={`/`}>
                  <div className="p-2 cursor-pointer hover:bg-slate-50 hover:text-black ">
                    All
                  </div>
                </Link>
                <Link to={"movie"}>
                  <div className="p-2 cursor-pointer hover:bg-slate-50 hover:text-black ">
                    Movies
                  </div>
                </Link>
                <Link to={"tv"}>
                  <div className="p-2 cursor-pointer hover:bg-slate-50 hover:text-black  rounded-b-lg">
                    TV Shows
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* STORE */}
          <div
            className="relative h-full"
            onMouseLeave={() => setStoreToggle(false)}
          >
            <div
              className={`px-3 flex items-center cursor-pointer h-full ${
                storeToggle && "border-b-4 border-white"
              }`}
              onMouseEnter={() => setStoreToggle(true)}
            >
              Store
              <Icon.rightArrow
                className={` ml-2 
            ${
              storeToggle ? "rotate-[270deg]" : "rotate-90"
            } transition-all duration-200`}
              />
            </div>

            {/* STORE OPTIONS */}

            {storeToggle && (
              <div className="absolute z-10 w-full  bg-slate-800 rounded-b-lg">
                <div className="p-2 cursor-pointer hover:bg-slate-50 hover:text-black">
                  All
                </div>
                <div className="p-2 cursor-pointer hover:bg-slate-50 hover:text-black">
                  Rent
                </div>
                <div className="p-2 cursor-pointer hover:bg-slate-50 hover:text-black rounded-b-lg">
                  Channels
                </div>
              </div>
            )}
          </div>

          {/* LIVE TV */}
          <div className="p-2 cursor-pointer hover:border-b-4 border-white h-full flex items-center">
            Live TV
          </div>

          {/* CATEGORIES  */}
          <div
            className="h-full"
            onMouseLeave={() => setCategoriesToggle(false)}
          >
            <div
              className={`px-3 cursor-pointer h-full ${
                categoriesToggle && "border-b-4 border-white"
              } flex items-center`}
              onMouseEnter={() => setCategoriesToggle(true)}
            >
              Categories
              <Icon.rightArrow
                className={` ml-1 
            ${
              categoriesToggle ? "rotate-[270deg]" : "rotate-90"
            } transition-all duration-200`}
              />
            </div>

            {/* CATEGORIES OPTION */}

            {categoriesToggle && (
              <div className="absolute z-50 w-full h-[400px]   bg-slate-800 rounded-2xl left-0 mx-auto px-12 py-6 flex justify-around items-start">
                <div className="flex flex-col justify-between items-start gap-8 ">
                  <p className="cursor-pointer">Genres</p>
                  <div className="flex justify-between items-start gap-8">
                    <div className="flex flex-col justify-start items-start gap-5">
                      <p className="cursor-pointer">Action</p>
                      <p className="cursor-pointer">Animation</p>
                      <p className="cursor-pointer">Documentary</p>
                      <p className="cursor-pointer">Drama</p>
                      <p className="cursor-pointer">Comedy</p>
                      <p className="cursor-pointer">Fantasy</p>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-5">
                      <p className="cursor-pointer">Horror</p>
                      <p className="cursor-pointer">International</p>
                      <p className="cursor-pointer">Kids</p>
                      <p className="cursor-pointer">Music</p>
                      <p className="cursor-pointer">Mystery and Thriller</p>
                      <p className="cursor-pointer">Romance</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start gap-8 ">
                  <p className="cursor-pointer">Features Collection</p>
                  <div className="flex justify-between items-start gap-8">
                    <div className="flex flex-col justify-start items-start gap-8">
                      <p className="cursor-pointer">Hindi</p>
                      <p className="cursor-pointer">English</p>
                      <p className="cursor-pointer">Gujrati</p>
                      <p className="cursor-pointer">Bengali</p>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-8">
                      <p className="cursor-pointer">Telugu</p>
                      <p className="cursor-pointer">Tamil</p>
                      <p className="cursor-pointer">Kannada</p>
                      <p className="cursor-pointer">Malyallam</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MY STUFF  */}
          <div
            className="relative h-full"
            onMouseLeave={() => setStuffToggle(false)}
          >
            <div
              className={`h-full px-3 flex items-center cursor-pointer ${
                stuffToggle && "border-b-4 border-white"
              }`}
              onMouseEnter={() => setStuffToggle(true)}
            >
              My Stuff
              <Icon.rightArrow
                className={` ml-1 
            ${
              stuffToggle ? "rotate-[270deg]" : "rotate-90"
            } transition-all duration-200`}
              />
            </div>

            {/* STUFF OPTIONS */}

            {stuffToggle && (
              <div className="absolute z-10 w-full bg-slate-800 rounded-b-lg">
                <div className="p-2 cursor-pointer hover:bg-slate-50 hover:text-black">
                  All
                </div>
                <Link to={"watchlist"}>
                  <div className="p-2 cursor-pointer hover:bg-slate-50 hover:text-black">
                    Watchlist
                  </div>
                </Link>
                <div className="p-2 cursor-pointer hover:bg-slate-50 hover:text-black rounded-b-lg">
                  Rentals
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PROFILE */}

        <div className="flex justify-between items-center gap-7 p-2 h-full">
          {searchToggle ? (
            <Icon.cross
              className="text-2xl cursor-pointer"
              onClick={() => setSearchToggle(false)}
            />
          ) : (
            <Icon.search
              className="text-2xl cursor-pointer"
              onClick={() => {
                setSearchToggle(true);
                inputRef.current.focus();
              }}
            />
          )}

          <Icon.profile className="text-3xl cursor-pointer text-blue-400" />
        </div>

        {/* SEARCH BAR */}
        {searchToggle && (
          <div className="absolute z-10 w-full h-16 bg-gray-400 top-full mt-2 border-4 border-white rounded-xl flex justify-start items-center ">
            <select
              value={selectedOption}
              className="text-black h-full p-2"
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="movie">Movie</option>
              <option value="tv_show">TV Shows</option>
            </select>

            <input
              type="text"
              ref={inputRef}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyUp={handleKeyPress}
              placeholder="Search"
              className="p-3 w-full h-full bg-inherit "
            />
            <p
              className="p-4 text-xl font-semibold whitespace-nowrap cursor-pointer"
              onClick={() => {
                setSearchInput("");
                inputRef.current.focus();
              }}
            >
              Clear All
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
