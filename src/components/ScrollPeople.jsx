/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import LazyLoadImage from "./LazyLoadImage";
import { images } from "../assets/images/_images";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../assets/IconLibrary";
import { useEffect } from "react";

const ScrollPeople = ({ title, isLoading = false, isError = false, data }) => {
  const [toggle, setToggle] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [index, setIndex] = useState(0);
  const [numImagePerScrren, setNumImagePerScreen] = useState(6);
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
      setNumImagePerScreen(4);
    } else if (viewportWidth < 950) {
      setNumImagePerScreen(5);
    } else {
      setNumImagePerScreen(6);
    }
  }, [viewportWidth]);

  const {
    data: { images: imageInfo },
  } = useQuery({
    queryKey: ["imageDetail"],
  });

  const aspectRatio = 311 / 175;
  const imageWidth = `${100 / numImagePerScrren}%`;
  const imageHeight = `calc(${imageWidth} * ${aspectRatio})`;

  const checkScrollable = (number) => {
    // RIGHT ARRAOW
    if (number < -(data?.length / numImagePerScrren - 1)) {
      return 0;
    }
    // LEFT ARROW
    if (number > 0) {
      return -Math.floor(data?.length / numImagePerScrren - 1);
    }
    return number;
  };

  const scrollLeft = () => {
    setIndex((prev) => checkScrollable(prev + 1));
  };

  const scrollRight = () => {
    setIndex((prev) => checkScrollable(prev - 1));
  };

  return (
    <div
      className="flex flex-col items-start justify-between gap-6 pl-8 sm:pl-4 my-6 relative"
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
    >
      <div className="text-3xl sm:text-lg font-semibold tracking-wide ml-5">
        {title}

        <div className="w-full border border-white/60 mt-1" />
      </div>

      {isLoading && <h1>Loading Person ......</h1>}
      {isError && <p>Error.........</p>}

      {!isLoading && !isError && (
        <>
          <div
            className="flex  transition-all duration-1000 relative"
            style={{
              transform: `translateX(${Math.floor(100) * index}%)`,
            }}
          >
            {data?.map((people, i) => {
              const {
                profile_path,
                name,
                popularity,
                known_for_department,
                known_for,
                id,
              } = people;

              let fullImagePath;

              if (!profile_path) {
                fullImagePath = images.placeholderImage;
              } else {
                fullImagePath =
                  imageInfo.secure_base_url +
                  imageInfo.poster_sizes.at(-1) +
                  profile_path;
              }

              return (
                <div
                  key={i}
                  className="grow-0 shrink-0 relative hover:z-20 hover:scale-105 transition-all duration-300 rounded-3xl "
                  style={{ flexBasis: imageWidth, height: imageHeight }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="w-full px-3 rounded-3xl hover:rounded-b-none">
                    <Link
                      to={`/person/${id}`}
                      state={{ fullImagePath, known_for }}
                    >
                      <LazyLoadImage
                        src={fullImagePath}
                        alt={"img"}
                        fallbackSrc={images.placeholderImage}
                        className="w-full rounded-3xl"
                      />
                    </Link>
                  </div>
                  {hoveredIndex === i && (
                    <div
                      className=" absolute hover:z-20 bg-black  flex flex-col gap-2 p-4 rounded-b-3xl"
                      style={{ width: "calc(100% - 16px)" }}
                    >
                      <p>{name}</p>
                      <p>{known_for_department}</p>
                      <p>{popularity}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ICONS */}
          {toggle && (
            <>
              <div
                className="absolute z-40 h-4/5  left-0 bottom-0 flex items-center text-white bg-slate-500/10 p-2 sm:p-1 cursor-pointer rounded-r-2xl"
                onClick={scrollLeft}
              >
                <Icon.leftArrow className="text-xl text-white/70 hover:text-white/100" />
              </div>
              <div
                className="absolute z-40 h-4/5 right-0 bottom-0 flex items-center text-white bg-slate-500/10  p-2 sm:p-1 cursor-pointer rounded-l-2xl"
                onClick={scrollRight}
              >
                <Icon.rightArrow className="text-xl text-white/70 hover:text-white/100" />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ScrollPeople;
