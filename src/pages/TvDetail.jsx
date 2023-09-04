/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ScrollSmallImages from "../components/ScrollSmallImages";
import { useEffect, useState } from "react";
import fetchDataFromApi from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const TvDetail = () => {
  const [selectSeasonNum, setSelectSeasonNum] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const { typeId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { list } = state;

  const {
    data: { images: imageInfo },
  } = useQuery({
    queryKey: ["imageDetail"],
  });

  const {
    isLoading,
    isError,
    error,
    data: tvInfo,
  } = useQuery({
    queryKey: ["tv", typeId],
    queryFn: () => fetchDataFromApi(`/tv/${typeId}`),
  });

  useEffect(() => {
    if (selectSeasonNum !== null && tvInfo !== null) {
      navigate(`/tv/${typeId}/${selectSeasonNum}`, {
        state: { tvInfo, list },
      });
    }
  }, [selectSeasonNum, tvInfo]);

  useEffect(() => {
    if (tvInfo) {
      // Retrieve watchlist data from localStorage
      let watchlist = JSON.parse(localStorage.getItem("watchlistTv")) || [];

      // Check if the current movie is in the watchlist
      const checkExistingMovie = watchlist.find((tv) => tv.id === tvInfo.id);

      if (checkExistingMovie) {
        setIsWatchlist(true);
      } else {
        setIsWatchlist(false);
      }
    }
  }, [tvInfo]);

  const handleToggleWatchlist = (fullImagePath) => {
    let watchlist = JSON.parse(localStorage.getItem("watchlistTv")) || [];

    if (isWatchlist) {
      // Remove the movie from watchlist
      watchlist = watchlist.filter((tv) => tv.id !== tvInfo.id);
    } else {
      // Add the movie to watchlist
      watchlist.push({ id: tvInfo.id, fullImagePath, list, tvInfo });
    }

    // Update localStorage
    localStorage.setItem("watchlistTv", JSON.stringify(watchlist));

    // Toggle isWatchlist state
    setIsWatchlist(!isWatchlist);
  };

  if (isLoading) {
    return <h1>Loading TV detail......</h1>;
  }

  if (isError) {
    return <h1>TV Detail Error {error}</h1>;
  }

  const {
    created_by: createdBy,
    adult: isAdult,
    first_air_date: firstAirDate,
    genres,
    last_air_date: lastAirDate,
    name: tvSeriesName,
    Idber_of_episodes: numberOfEpisodes,
    number_of_seasons: numberOfSeasons,
    overview: description,
    production_companies: productionCompanies,
    production_countries: productionCountries,
    seasons,
    spoken_languages: spokenLanguage,
    tagline,
    vote_average: rating,
    backdrop_path,
  } = tvInfo;

  const changeDateFormat = (dateStr) => {
    return dateStr.split("-").reverse().join("-");
  };

  const fullImagePath =
    imageInfo.secure_base_url + imageInfo.poster_sizes.at(-1) + backdrop_path;

  return (
    <>
      <div className="flex flex-col w-full h-auto">
        {/* UPPER 100vh DIV */}
        <div className="relative pt-4 pr-4 pl-16  w-full detail_height">
          {/* IMAGE DIV */}
          <div className="w-auto h-full ml-auto relative image_shadow ">
            <img
              src={fullImagePath}
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
                <option className="text-lg font-medium tracking-wide p-2 rounded-2xl bg-black text-white">
                  Select Season
                </option>
                {seasons.map((season, i) => {
                  const { season_number: seasonNumber } = season;

                  if (!seasonNumber || seasonNumber === 0) return;

                  return (
                    <option
                      key={i}
                      value={seasonNumber}
                      className="text-lg font-medium tracking-wide p-2 rounded-2xl bg-black text-white"
                    >
                      Season {seasonNumber}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex justify-start items-center gap-4">
              <p>IMDb {parseFloat(rating.toFixed(1))}</p>
              <p>{isAdult ? "Adult" : "Universal"}</p>
            </div>
            <div className="flex justify-start gap-4">
              {genres.map((genre, i) => (
                <p key={i}>{genre.name}</p>
              ))}
            </div>
            <div className="flex justify-start items-center gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-xl font-medium border-b-[1px] border-white">
                  First Air
                </p>
                <p>{changeDateFormat(firstAirDate)}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xl font-medium border-b-[1px] border-white">
                  Last Air
                </p>
                <p>{changeDateFormat(lastAirDate)}</p>
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <p>Total Seasons: {numberOfSeasons}</p>
              <p>Total Episodes : {numberOfEpisodes}</p>
            </div>
            <div className="flex gap-4">
              <div>CreatedBy : </div>
              <div>
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
                onClick={() => handleToggleWatchlist(fullImagePath)}
              >
                {isWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </p>
              {/* PlayButton */}
              {/* WatchList */}
              {/* Like */}
            </div>
          </div>
        </div>

        {/* RELATED AND DETAIL */}

        <div className="sticky z-10 bottom-0 w-full px-4 pt-4 text-lg font-semibold tracking-wider flex justify-center items-center gap-4">
          <p
            className={`${
              !showDetail && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer`}
            onClick={() => setShowDetail(false)}
          >
            Related
          </p>
          <p
            className={`${
              showDetail && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer`}
            onClick={() => setShowDetail(true)}
          >
            Details
          </p>
        </div>

        {/* SHOWDETAIL */}

        {showDetail ? (
          <div className="p-16 pr-0 flex flex-col items-start justify-between gap-12 relative z-10 w-4/5">
            <div>
              <p className="text-xl font-semibold tracking-wider mb-2">
                DESCRIPTION
              </p>
              <p>{description}</p>
            </div>
            <div>
              <p className="text-xl font-semibold tracking-wider mb-2">
                BUDGET
              </p>
              <p>Millions</p>
            </div>
            <div>
              <p className="text-xl font-semibold tracking-wider mb-2">
                REVENUE
              </p>
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
        ) : (
          <>
            <ScrollSmallImages
              title={"Customer Also Watch"}
              list={list ? list : null}
            />
            <div className="w-full h-40 bg-inherit" />
          </>
        )}
      </div>
    </>
  );
};

export default TvDetail;
