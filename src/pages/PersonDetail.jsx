import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import fetchDataFromApi from "../utils/api";
import LazyLoadImage from "../components/LazyLoadImage";
import { images } from "../assets/images/_images";
import { useState } from "react";

const PersonDetail = () => {
  const [showFullBiography, setShowFullBiography] = useState(false);
  const {
    data: { images: imageInfo },
  } = useQuery({
    queryKey: ["imageDetail"],
  });

  const { typeId } = useParams();
  const {
    state: { fullImagePath, known_for },
  } = useLocation();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["person", typeId],
    queryFn: async () => await fetchDataFromApi(`/person/${typeId}`),
  });

  if (isLoading) {
    return <h1>Loading........</h1>;
  }
  if (isError) {
    return <h1>Error: {error}</h1>;
  }

  const {
    biography,
    birthday,
    deathday,
    known_for_department,
    name,
    place_of_birth,
    popularity,
  } = data;

  const list = known_for;

  return (
    <div className="flex flex-col gap-28 py-8">
      <div className="flex flex-row gap-10 px-10">
        <div
          className="grow-0 shrink-0 rounded-2xl"
          style={{ flexBasis: "20%" }}
        >
          <LazyLoadImage
            src={fullImagePath}
            alt={"img"}
            fallbackSrc={images.placeholderImage}
            className="w-full rounded-2xl"
          />
        </div>
        <div className=" flex flex-col gap-4 mt-3">
          <p className="text-3xl font-semibold tracking-wide">{name}</p>
          <p>{birthday}</p>
          <p>{place_of_birth}</p>
          {!deathday && <p>{deathday}</p>}
          <p>{known_for_department}</p>
          <p>{popularity}</p>

          {biography.split(" ").length <= 100 ? (
            <p>{biography}</p>
          ) : (
            <>
              {showFullBiography ? (
                <p className="leading-7 tracking-wide">
                  {biography}
                  <span
                    className="text-blue-800 font-bold cursor-pointer p-2"
                    onClick={() => setShowFullBiography(false)}
                  >
                    Show Less
                  </span>
                </p>
              ) : (
                <p className="leading-7 tracking-wide">
                  {biography.split(" ").slice(0, 100).join(" ")}...
                  <span
                    className="text-blue-800 font-bold cursor-pointer p-2"
                    onClick={() => setShowFullBiography(true)}
                  >
                    Show More
                  </span>
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex ">
        {list.map((single, i) => {
          const {
            backdrop_path,
            id,
            media_type,
            release_date,
            title,
            vote_average,
          } = single;
          let fullImagePath;

          if (!backdrop_path) {
            fullImagePath = images.placeholderImage;
          } else {
            fullImagePath =
              imageInfo.secure_base_url +
              imageInfo.poster_sizes.at(-1) +
              backdrop_path;
          }

          return (
            <div
              key={i}
              className="grow-0 bottom-0 relative hover:scale-125 hover:z-10 transition-all duration-300 rounded-3xl px-4 hover:ease-in ease-out"
              style={{ flexBasis: "25%" }}
            >
              <Link to={`/${media_type}/${id}`} state={{ list }}>
                <LazyLoadImage
                  src={fullImagePath}
                  alt={"img"}
                  fallbackSrc={images.placeholderImage}
                  className="w-full rounded-3xl"
                />
              </Link>
              <div className="absolute z-50 w-full p-2 flex flex-col gap-4">
                <p>{title}</p>
                <p>{release_date}</p>
                <p>{vote_average}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full h-60" />
    </div>
  );
};

export default PersonDetail;
