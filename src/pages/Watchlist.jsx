/* eslint-disable no-undef */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Watchlist = () => {
  const [sortBy, setSortBy] = useState(1);
  const navigate = useNavigate();

  // prettier-ignore
  const {data: { images: imageInfo }} = useQuery({ queryKey: ["imageDetail"] });

  const watchlistMovie =
    JSON.parse(localStorage.getItem("watchlistMovie")) || [];

  const watchlistTv = JSON.parse(localStorage.getItem("watchlistTv")) || [];
  const watchlistTvSeason =
    JSON.parse(localStorage.getItem("watchlistTvSeason")) || [];

  const handleNavigation = (
    type,
    id,
    list,
    selectSeasonNum = null,
    tvInfo = null
  ) => {
    if (selectSeasonNum) {
      navigate(`/${type}/${id}/${selectSeasonNum}`, {
        state: { tvInfo, list },
      });
    } else {
      navigate(`/${type}/${id}`, {
        state: { list },
      });
    }
  };

  return (
    <div className="p-12 text-white">
      <div className="flex items-end ">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
          className="bg-black text-white p-4 ml-auto border-2 border-white outline-2 outline-white"
        >
          <option value={1}>All</option>
          <option value={2}>Movies</option>
          <option value={3}>TV Shows</option>
          <option value={4}>TV Seasons</option>
        </select>
      </div>

      {(sortBy == 1 || sortBy == 2) && (
        <div className="flex flex-col gap-6">
          <div>Movies</div>
          <div className="grid grid-cols-4 gap-4">
            {watchlistMovie.map((movie, index) => {
              const { id, fullImagePath, list, movieInfo } = movie;

              const { title, vote_average: rating } = movieInfo;

              return (
                <div
                  key={index}
                  className="relative hover:z-10 hover:scale-125 transition-all duration-300"
                >
                  <div
                    className="cursor-pointer w-full relative"
                    onClick={() => handleNavigation("movie", id, list)}
                  >
                    <img src={fullImagePath} alt="img" className="w-full" />
                    <div className="absolute p-3 border-2 border-white rounded-full bottom-0 right-0">
                      {rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>{title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(sortBy == 1 || sortBy == 3) && (
        <div className="flex flex-col gap-6">
          <div>Tv Shows</div>
          <div className="grid grid-cols-4 gap-4">
            {watchlistTv.map((tv, index) => {
              const { id, fullImagePath, list, tvInfo } = tv;

              const { name, vote_average: rating } = tvInfo;

              return (
                <div
                  key={index}
                  className="relative hover:z-10 hover:scale-125 transition-all duration-300"
                >
                  <div
                    className="cursor-pointer w-full relative"
                    onClick={() => handleNavigation("tv", id, list)}
                  >
                    <img src={fullImagePath} alt="img" className="w-full" />
                    <div className="absolute p-3 border-2 border-white rounded-full bottom-0 right-0">
                      {rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>{name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(sortBy == 1 || sortBy == 4) && (
        <div className="flex flex-col gap-6">
          <div>TV Seasons</div>
          <div className="grid grid-cols-4 gap-4">
            {watchlistTvSeason.map((tvSeason, index) => {
              const { typeId, selectSeasonNum, tvSeasonInfo, tvInfo, list } =
                tvSeason;

              const { name } = tvInfo;

              const {
                air_date: airDate,
                vote_average: rating,
                poster_path,
              } = tvSeasonInfo;

              const fullPosterPath =
                imageInfo.secure_base_url +
                imageInfo.poster_sizes.at(-1) +
                poster_path;

              return (
                <div
                  key={index}
                  className="relative hover:z-10 hover:scale-125 transition-all duration-300"
                >
                  <div
                    className="cursor-pointer w-full relative"
                    onClick={() =>
                      handleNavigation(
                        "tv",
                        typeId,
                        list,
                        selectSeasonNum,
                        tvInfo
                      )
                    }
                  >
                    <img src={fullPosterPath} alt="img" className="w-full" />
                    <div className="absolute p-3 border-2 border-white rounded-full bottom-0 right-0">
                      {rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>{name}</p>
                    <p>{airDate}</p>
                    {/* <p>{numberOfEpisodes}</p> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
