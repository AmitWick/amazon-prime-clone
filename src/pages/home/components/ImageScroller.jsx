/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import image1 from "../../../assets/images/AppBreweryWallpaper 1.jpg";
// import image2 from "../../../assets/images/AppBreweryWallpaper 2.jpg";
// import image3 from "../../../assets/images/AppBreweryWallpaper 3.jpg";
// import image4 from "../../../assets/images/AppBreweryWallpaper 4.jpg";
import { Icon } from "../../../assets/IconLibrary";
import { images } from "../../../assets/images/_images";
import LazyLoadImage from "../../../components/LazyLoadImage";
import { Link } from "react-router-dom";

const ImageScroller = ({ list, isLoaing = false, isError = false, error }) => {
  const [index, setIndex] = useState(0);
  const [toggleIcon, setToggleIcon] = useState(false);

  const {
    data: { images: imageInfo },
  } = useQuery({
    queryKey: ["imageDetail"],
  });
  const checkScrollable = (number) => {
    if (number < -(list?.length - 1)) {
      return 0;
    }
    if (number > 0) {
      return -(list?.length - 1);
    }
    return number;
  };

  const scrollLeft = () => {
    setIndex((prev) => checkScrollable(prev + 1));
  };

  const scrollRight = () => {
    setIndex((prev) => checkScrollable(prev - 1));
  };

  if (isLoaing) {
    return <h1>Loading....</h1>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div
      className="sm:h-[200px] relative h-[400px]  "
      onMouseEnter={() => setToggleIcon(true)}
      onMouseLeave={() => setToggleIcon(false)}
    >
      {/* <div className="h-full "> */}
      <div
        className="flex h-full transition-all duration-1000"
        style={{ transform: `translateX(${100 * index}%)` }}
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

          return (
            <div
              key={i}
              className="grow-0 shrink-0 px-6 rounded-3xl relative"
              style={{ flexBasis: "100%" }}
            >
              <Link to={`/${prime.media_type}/${prime.id}`} state={{ list }}>
                <LazyLoadImage
                  src={fullImagePath}
                  alt="image1"
                  fallbackSrc={images.placeholderImage}
                  className="w-full h-full  rounded-3xl"
                />
              </Link>

              <div className="absolute z-20 top-[20%] left-[10%] w-96 sm:w-48">
                <p className="text-5xl sm:text-2xl text-white/70 font-semibold tracking-wider leading-[60px]">
                  {titleName}
                </p>
                <div className="w-full mt-2 border-2 border-white/70 " />
              </div>
            </div>
          );
        })}
      </div>

      {toggleIcon && (
        <>
          <div className="absolute top-0 h-full bg-slate-950/10 p-2 sm:p-1 z-20 flex items-center cursor-pointer text-3xl sm:text-lg left-0 text-white/50 rounded-r-2xl">
            <Icon.leftArrow
              className="hover:text-white/100"
              onClick={scrollLeft}
            />
          </div>
          <div className="absolute top-0 h-full bg-slate-950/10 p-2 sm:p-1 z-20 flex items-center cursor-pointer text-3xl sm:text-lg right-0 text-white/50 rounded-l-2xl">
            <Icon.rightArrow
              className="hover:text-white/100"
              onClick={scrollRight}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageScroller;
