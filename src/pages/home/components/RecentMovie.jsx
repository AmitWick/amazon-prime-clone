import { useState } from "react";
import { images } from "../../../assets/images/_images";
import { Icon } from "../../../assets/IconLibrary";
const RecentMovie = () => {
  const [toggle, setToggle] = useState(false);
  const [index, setIndex] = useState(0);
  const {
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  } = images;

  const imageList = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];

  const checkScrollable = (number) => {
    if (number < -(imageList.length - 4)) {
      return 0;
    }

    if (number > 0) {
      return -(imageList.length - 4);
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
    <div className="relative h-auto flex flex-col items-start justify-between gap-6 pl-10 my-20">
      {/* HEADING */}
      <p className="text-3xl font-semibold tracking-wide ml-5 ">
        Continue Watching
      </p>

      {/* IMAGE CONTAINER */}
      <div
        className="relative  h-[200px] flex justify-between items-center"
        onMouseEnter={() => setToggle(true)}
        onMouseLeave={() => setToggle(false)}
      >
        {imageList.map((image, i) => (
          <img
            key={i}
            src={image}
            className="w-1/4 h-full rounded-[55px] p-2 cursor-pointer transition-all duration-100"
            style={{ transform: `translateX(${100 * index}%)` }}
          />
        ))}

        {/* ICONS */}
        {toggle && (
          <>
            <div
              className="absolute z-20  h-full left-0 flex items-center text-white bg-slate-500/10  p-2 cursor-pointer rounded-r-2xl -ml-10"
              onClick={scrollLeft}
            >
              <Icon.leftArrow className="text-xl" />
            </div>
            <div
              className="absolute z-20  h-full right-0 flex items-center text-white bg-slate-500/10  p-2 cursor-pointer rounded-l-2xl"
              onClick={scrollRight}
            >
              <Icon.rightArrow className="text-xl" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecentMovie;
