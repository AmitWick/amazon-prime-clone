/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import fetchDataFromApi from "../utils/api";
import ScrollSmallImages from "../components/ScrollSmallImages";
import { images } from "../assets/images/_images";
import { useQuery } from "@tanstack/react-query";
import LazyLoadImage from "../components/LazyLoadImage";
import { shortSentences } from "../utils/ShortSentence";

const TvSeason = () => {
  const { typeId, seasonNum } = useParams();
  const navigate = useNavigate();
  const [tvSeasonInfo, setTvSeasonInfo] = useState(null);
  const [selectSeasonNum, setSelectSeasonNum] = useState(seasonNum);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [activeBtnNum, setActiveBtnNum] = useState(1);
  const { state } = useLocation();
  const { tvInfo, list } = state;

  const {
    data: { images: imageInfo },
  } = useQuery({ queryKey: ["imageDetail"] });

  useEffect(() => {
    // Check if the TV season is in the watchlist
    const watchlist =
      JSON.parse(localStorage.getItem("watchlistTvSeason")) || [];
    const checkExistingTvSeason = watchlist.find((tv) => {
      return (
        Number(tv.typeId) == typeId &&
        Number(tv.selectSeasonNum) == selectSeasonNum
      );
    });

    if (checkExistingTvSeason) {
      setIsWatchlist(true);
    } else {
      setIsWatchlist(false);
    }
  }, [typeId]);

  useEffect(() => {
    navigate(`/tv/${typeId}/${selectSeasonNum}`, {
      state: { tvInfo, list },
    });

    (async () => {
      const response = await fetchDataFromApi(
        `/tv/${typeId}/season/${selectSeasonNum}`
      );
      setTvSeasonInfo(response);

      document.title = "TV Shows: " + tvInfo.name + " " + response.name;

      // Check if the TV season is in the watchlist
      const watchlist =
        JSON.parse(localStorage.getItem("watchlistTvSeason")) || [];
      const checkExistingTvSeason = watchlist.find((tv) => {
        return (
          Number(tv.typeId) == typeId &&
          Number(tv.selectSeasonNum) == selectSeasonNum
        );
      });

      if (checkExistingTvSeason) {
        setIsWatchlist(true);
      } else {
        setIsWatchlist(false);
      }
    })();
  }, [selectSeasonNum]);

  const handleToggleWatchlist = (selectSeasonNum) => {
    const watchlist =
      JSON.parse(localStorage.getItem("watchlistTvSeason")) || [];

    if (isWatchlist) {
      // Remove the TV season from watchlist
      const updatedWatchlist = watchlist.filter((tv) => {
        return Number(tv.selectSeasonNum) != selectSeasonNum;
      });

      localStorage.setItem(
        "watchlistTvSeason",
        JSON.stringify(updatedWatchlist)
      );
    } else {
      // Add the TV season to watchlist
      const newTvSeason = {
        typeId,
        selectSeasonNum,
        tvSeasonInfo,
        tvInfo,
        list,
      };
      localStorage.setItem(
        "watchlistTvSeason",
        JSON.stringify([...watchlist, newTvSeason])
      );
    }

    // Toggle isWatchlist state
    setIsWatchlist((prev) => !prev);

    console.log("Ending", isWatchlist);
  };

  if (!tvSeasonInfo) {
    return <h1>Loading Tv Seasons data......</h1>;
  }

  //   prettier-ignore
  const {  created_by: createdBy,  adult: isAdult, genres,  name: tvSeriesName, 
    production_companies: productionCompanies, production_countries: productionCountries,
    seasons, spoken_languages: spokenLanguage, tagline } = tvInfo;

  const {
    air_date: airDate,
    overview: description,
    vote_average: rating,
    poster_path,
    episodes: numberOfEpisodes,
  } = tvSeasonInfo;

  let fullPosterPath;
  if (!tvSeasonInfo.poster_path) {
    fullPosterPath = images.placeholderImage;
  } else {
    fullPosterPath =
      imageInfo.secure_base_url + imageInfo.poster_sizes.at(-1) + poster_path;
  }

  const changeDateFormat = (dateStr) => {
    return dateStr?.split("-").reverse().join("-");
  };

  return (
    <div className="flex flex-col w-full h-auto">
      {/* UPPER 100vh DIV */}
      <div className="relative pt-4 pr-4 pl-16  w-full detail_height">
        {/* IMAGE DIV */}
        <div className="w-auto h-full ml-auto relative image_shadow ">
          <img
            src={fullPosterPath}
            alt="img"
            className="w-full h-full rounded-[55px]"
          />
        </div>

        {/* TV BRIEF DETAIL */}
        <div className="absolute bottom-10 flex flex-col items-start justify-end gap-4">
          <div className="flex flex-col items-start gap-6  w-[550px]">
            <p className="text-6xl font-extrabold tracking-wide leading-snug">
              {tvSeriesName}
            </p>
            <p className="text-2xl font-semibold ">{tagline}</p>
          </div>

          <div className="rounded-2xl ">
            <select
              value={selectSeasonNum}
              className="text-black text-lg font-medium tracking-wide p-4 rounded-2xl"
              onChange={(e) => setSelectSeasonNum(e.target.value)}
            >
              {seasons.map((season, i) => {
                const { season_number: seasonNumber } = season;

                if (!seasonNumber || seasonNumber === 0) return;

                return (
                  <option
                    key={i}
                    value={seasonNumber}
                    className="text-lg font-medium tracking-wide p-2 rounded-2xl bg-red-500 text-white"
                  >
                    Season {seasonNumber}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-start items-center gap-4">
            <p>IMDb {rating.toFixed(1)}</p>
            <p>{isAdult ? "Adult" : "Universal"}</p>
          </div>
          <div className="flex justify-start gap-4">
            {genres.map((genre, i) => (
              <p key={i}>{genre.name}</p>
            ))}
          </div>
          {airDate && (
            <div className="flex justify-start items-center gap-6">
              <p className="text-xl font-medium border-b-[1px] border-white">
                Air Date
              </p>
              <p>{changeDateFormat(airDate)}</p>
            </div>
          )}

          <div className="flex justify-start items-center gap-4">
            <p>Total Episodes : {numberOfEpisodes.length}</p>
          </div>
          <div className="flex gap-4">
            <div>CreatedBy : </div>
            <div className="flex gap-3">
              {createdBy.map((by, i) => {
                return <div key={i}>{by.name}</div>;
              })}
            </div>
          </div>
          <div>
            <p
              className={`border-2 border-white rounded-lg px-4 py-2 cursor-pointer ${
                isWatchlist && "bg-gray-500 text-white"
              }`}
              onClick={() => handleToggleWatchlist(selectSeasonNum)}
            >
              {isWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </p>
            {/* PlayButton */}
            {/* WatchList */}
            {/* Like */}
          </div>
        </div>
      </div>

      {/*EPISODES AND  RELATED AND DETAIL */}

      <div className="sticky z-10 bottom-0 w-full px-4 pt-4 text-lg font-semibold tracking-wider flex justify-center items-center gap-6">
        <p
          className={`${
            activeBtnNum === 1 && "border-b-2 border-white"
          } hover:border-b-2 hover:border-white cursor-pointer`}
          onClick={() => setActiveBtnNum(1)}
        >
          Episodes
        </p>
        <p
          className={`${
            activeBtnNum === 2 && "border-b-2 border-white"
          } hover:border-b-2 hover:border-white cursor-pointer`}
          onClick={() => setActiveBtnNum(2)}
        >
          Related
        </p>
        <p
          className={`${
            activeBtnNum === 3 && "border-b-2 border-white"
          } hover:border-b-2 hover:border-white cursor-pointer`}
          onClick={() => setActiveBtnNum(3)}
        >
          Details
        </p>
      </div>

      {/* EPISODES */}

      {activeBtnNum === 1 && (
        <>
          <div className="relative z-10 p-12">
            {numberOfEpisodes.map((episode, i) => {
              const {
                air_date,
                name,
                overview,
                runtime,
                still_path,
                vote_average,
                season_number,
                episode_number,
              } = episode;

              let imagePath;
              if (!still_path) {
                imagePath = images.placeholderImage;
              } else {
                imagePath =
                  imageInfo.secure_base_url +
                  imageInfo.poster_sizes.at(-1) +
                  still_path;
              }

              return (
                <div
                  key={i}
                  className=" mb-6  w-full h-auto flex justify-start items-start gap-7 rounded-2xl text-xl font-medium tracking-wide"
                >
                  <div
                    className="grow-0 shrink-0 relative h-auto rounded-l-2xl"
                    style={{ flexBasis: "28%" }}
                  >
                    <LazyLoadImage
                      src={imagePath}
                      alt={"img"}
                      fallbackSrc={null}
                      className="rounded-2xl w-full h-full object-cover"
                    />

                    {vote_average.toFixed(1) != 0 && (
                      <div className="border border-white rounded-full p-2 absolute bottom-0 right-0">
                        <p>{vote_average.toFixed(1)}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-between mt-2 gap-2">
                    <div className="flex items-center justify-start gap-2 font-semibold mb-5">
                      <p>S{season_number} </p>
                      <p>E{episode_number}</p>
                      <p className="mx-2">-</p>
                      <p>{name}</p>
                    </div>
                    <div className="flex gap-6 text-lg">
                      <p>{changeDateFormat(air_date)}</p>
                      <p>{runtime} min</p>
                    </div>
                    <div>
                      <p className="text-base">
                        {shortSentences(overview, 50)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full h-60" />
        </>
      )}

      {/* SHOWDETAIL */}

      {activeBtnNum === 3 && (
        <div className="p-16 pr-0 flex flex-col items-start justify-between gap-12 relative z-10 w-4/5">
          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">
              DESCRIPTION
            </p>
            <p>{description}</p>
          </div>
          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">BUDGET</p>
            <p>Millions</p>
          </div>
          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">REVENUE</p>
            <p>Millions</p>
          </div>

          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">
              PRODUCTION COMPANIES
            </p>
            <div className="flex justify-start gap-8">
              {productionCompanies.map((company, i) => {
                return <p key={i}>{company.name}</p>;
              })}
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">
              PRODUCTION COUNTRIES
            </p>
            <div className="flex justify-start gap-8">
              {productionCountries.map((country, i) => {
                return <p key={i}>{country.name}</p>;
              })}
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">
              AUDIO LANGUAGE
            </p>
            <div className="flex justify-start gap-6">
              {spokenLanguage.map((language, i) => {
                return <p key={i}>{language.english_name}</p>;
              })}
            </div>
          </div>
        </div>
      )}

      {/* SHOW RELATED CONTENT */}
      {activeBtnNum === 2 && (
        <>
          <ScrollSmallImages title={"Customer Also Watch"} list={list} />
          <div className="w-full h-40 bg-inherit" />
        </>
      )}
    </div>
  );
};

export default TvSeason;
