/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icon } from "../assets/IconLibrary";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../assets/images/_images";
import { useQuery } from "@tanstack/react-query";
import LazyLoadImage from "./LazyLoadImage";
import { useEffect } from "react";
const ScrollSmallImages = ({
  title,
  list,
  isLoading = false,
  isError = false,
}) => {
  const [toggle, setToggle] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [index, setIndex] = useState(0);
  const [numImagePerScrren, setNumImagePerScreen] = useState(4);
  const navigate = useNavigate();
  // Create state to store the current viewport width
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Function to update the viewport width
  const updateViewportWidth = () => {
    setViewportWidth(window.innerWidth);
  };

  // Add an event listener to update the viewport width when the window is resized
  useEffect(() => {
    window.addEventListener("resize", updateViewportWidth);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  useEffect(() => {
    if (viewportWidth < 640) {
      setNumImagePerScreen(2);
    } else if (viewportWidth < 950) {
      setNumImagePerScreen(3);
    } else {
      setNumImagePerScreen(4);
    }
  }, [viewportWidth]);

  const {
    data: { images: imageInfo },
  } = useQuery({
    queryKey: ["imageDetail"],
  });

  // const aspectRatio = 311 / 175;
  // const imageHeight = `calc(${imageWidth} * ${aspectRatio})`;

  const checkScrollable = (number) => {
    // RIGHT ARRAOW
    if (number < -(list?.length / numImagePerScrren - 1)) {
      return 0;
    }

    // LEFT ARROW
    if (number > 0) {
      return -Math.floor(list?.length / numImagePerScrren - 1);
    }
    return number;
  };

  const scrollLeft = () => {
    setIndex((prev) => checkScrollable(prev + 1));
  };

  const scrollRight = () => {
    setIndex((prev) => checkScrollable(prev - 1));
  };

  const link = (prime, fullImagePath, list) => {
    let type;

    if (prime.name) {
      type = "tv";
    } else {
      type = "movie";
    }

    navigate(`/${type}/${prime.id}`, {
      state: { fullImagePath, list },
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className=" hover:h-full relative z-0 h-auto flex flex-col items-start justify-between gap-6 sm:gap-3 pl-10 md:pl-6 sm:pl-3 my-20 sm:my-8"
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
    >
      {/* HEADING */}
      <p className="text-3xl  sm:text-lg font-semibold tracking-wide ml-5">
        {title}
        <div className="w-full border border-white/60 mt-1" />
      </p>

      {isLoading && <h1>Loading....</h1>}
      {isError && <h1>Error Occured............</h1>}

      {!isLoading && !isError && (
        <>
          {/* IMAGE CONTAINER */}
          <div
            className="flex transition-all duration-1000 relative"
            // justify-between items-center
            style={{
              transform: `translateX(${Math.floor(100) * index}%)`,
            }}
          >
            {list?.map((prime, i) => {
              let fullImagePath;

              if (!prime.backdrop_path) {
                fullImagePath = images.placeholderImage;
              } else {
                fullImagePath =
                  imageInfo.secure_base_url +
                  imageInfo.poster_sizes.at(-1) +
                  prime.backdrop_path;
              }

              const titleName = prime.title ? prime.title : prime.name;

              let type;

              if (prime.name) {
                type = "tv";
              } else {
                type = "movie";
              }

              return (
                <div
                  key={i}
                  className="grow-0 shrink-0 relative hover:z-50 hover:scale-110 
             rounded-3xl hover:rounded-b-none px-2 md:px-1 cursor-pointer transition-all duration-300 ease-out hover:ease-in h-44 sm:h-32"
                  style={{ flexBasis: `${100 / numImagePerScrren}%` }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link to={`/${type}/${prime.id}`} state={{ list }}>
                    <LazyLoadImage
                      key={i}
                      src={
                        fullImagePath ? fullImagePath : images.placeholderImage
                      }
                      onClick={() => link(prime, fullImagePath, list)}
                      className="h-full w-full rounded-3xl hover:rounded-b-none  relative"
                    />
                  </Link>
                  {hoveredIndex === i && (
                    <div
                      className=" absolute w-full  hover:z-20 bg-black  flex flex-col gap-2  rounded-b-3xl p-3 pr-0"
                      // style={{ width: "calc(100% - 16px)" }}
                    >
                      <p>{titleName}</p>
                      <p>{parseFloat(prime.vote_average.toFixed(1))}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ICONS */}
          {toggle && list?.length > numImagePerScrren && (
            <>
              <div
                className="absolute z-40 h-3/4  left-0 bottom-0 flex items-center text-white/50 bg-slate-500/30 p-2 md:p-1  cursor-pointer rounded-r-2xl"
                onClick={scrollLeft}
              >
                <Icon.leftArrow className="text-xl hover:text-white/100" />
              </div>
              <div
                className="absolute z-40 h-3/4 right-0 bottom-0 flex items-center text-white/50 bg-slate-500/30  p-2 md:p-1 cursor-pointer rounded-l-2xl"
                onClick={scrollRight}
              >
                <Icon.rightArrow className="text-xl hover:text-white/100" />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ScrollSmallImages;
