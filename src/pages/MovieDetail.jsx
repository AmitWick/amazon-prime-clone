/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useParams } from "react-router-dom";
import ScrollSmallImages from "../components/ScrollSmallImages";
import { useEffect, useState } from "react";
import fetchDataFromApi from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { addRecentHistory } from "../store/slices/RecentHistorySlice";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(null);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const { typeId } = useParams();
  const {
    state: { list },
  } = useLocation();
  const {
    data: { images: imageInfo },
  } = useQuery({
    queryKey: ["imageDetail"],
  });

  // prettier-ignore
  const {isLoading,isError,error,data: movieInfo,} = useQuery({ queryKey: ["movie", typeId],
    queryFn: () => fetchDataFromApi(`/movie/${typeId}`), });

  useEffect(() => {
    if (movieInfo) {
      // Retrieve watchlist data from localStorage
      let watchlist = JSON.parse(localStorage.getItem("watchlistMovie")) || [];

      // Check if the current movie is in the watchlist
      const checkExistingMovie = watchlist.find(
        (movie) => movie.id === movieInfo.id
      );

      if (checkExistingMovie) {
        setIsWatchlist(true);
      } else {
        setIsWatchlist(false);
      }

      let recents = JSON.parse(localStorage.getItem("recentHistory")) || [];

      const checkRecentHistory = recents.find((recent) => {
        return recent.id == movieInfo.id;
      });

      if (!checkRecentHistory) {
        // dispatch movieInfo
        dispatch(addRecentHistory(movieInfo));
        console.log("Recent Movie Dispatch");
      }
    }
  }, [movieInfo]);

  const handleToggleWatchlist = (fullImagePath) => {
    let watchlist = JSON.parse(localStorage.getItem("watchlistMovie")) || [];

    if (isWatchlist) {
      // Remove the movie from watchlist
      watchlist = watchlist.filter(
        (movie) => movie.imdb_id !== movieInfo.imdb_id
      );
    } else {
      // Add the movie to watchlist
      watchlist.push({ id: movieInfo.id, fullImagePath, movieInfo });
    }

    // Update localStorage
    localStorage.setItem("watchlistMovie", JSON.stringify(watchlist));

    // Toggle isWatchlist state
    setIsWatchlist(!isWatchlist);
  };

  if (isLoading) {
    return <h1>Loading Movie detail......</h1>;
  }

  if (isError) {
    return <h1>Movie Detail Error {error}</h1>;
  }

  // prettier-ignore
  const {  genres,runtime,tagline, production_companies,  production_countries,  spoken_languages,  budget, revenue, title, adult: isAdult,  overview: description,
    release_date: releaseDate, vote_average: rating, backdrop_path} = movieInfo;

  const movieHour = Math.floor(runtime / 60);
  const movieMinute = runtime % 60;
  const budgetInMillions = Math.floor(budget / 1000000);
  const revenueInMillions = Math.floor(revenue / 1000000);

  const newReleaseDate = releaseDate?.split("-").reverse().join("-");

  const scrollRelatedDetail = (value) => {
    setShowDetail(value);

    window.scrollTo({
      top: window.innerHeight - 120,
      behavior: "smooth",
    });
  };

  const fullImagePath =
    imageInfo.secure_base_url + imageInfo.poster_sizes.at(-1) + backdrop_path;

  return (
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

        {/* MOVIE BRIEF DETAIL */}
        <div className="absolute bottom-10 flex flex-col items-start justify-end gap-4">
          <div className="flex flex-col items-start gap-6 w-[550px]">
            <p className="text-6xl font-extrabold tracking-wide leading-snug">
              {title}
            </p>
            <p className="text-2xl font-semibold ">{tagline}</p>
          </div>
          <div className="flex justify-start items-center gap-4">
            <p>IMDb {parseFloat(rating.toFixed(1))}</p>
            <p>{newReleaseDate}</p>
            <p>{`${movieHour}h ${movieMinute}min`}</p>
            <p>{isAdult ? "Adult" : "Universal"}</p>
          </div>
          <div className="flex justify-start gap-4">
            {genres.map((genre, i) => (
              <p key={i}>{genre.name}</p>
            ))}
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
      <div
        className="sticky top-[60px] z-20 w-full text-lg font-semibold tracking-wider  flex justify-center pb-2"
        style={{ height: "60px" }}
      >
        <div className="w-max flex items-center gap-6 rounded-2xl  px-10 h-full border-2 border-slate-600">
          <p
            className={`${
              showDetail === 1 && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer `}
            onClick={() => scrollRelatedDetail(1)}
          >
            Related
          </p>
          <p
            className={`${
              showDetail === 2 && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer`}
            onClick={() => scrollRelatedDetail(2)}
          >
            Details
          </p>
        </div>
      </div>

      {/* SHOWDETAIL */}

      {showDetail === 2 && (
        <div className="p-16 pr-0 flex flex-col items-start justify-between gap-12 relative z-10 w-4/5">
          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">
              DESCRIPTION
            </p>
            <p>{description}</p>
          </div>
          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">BUDGET</p>
            <p>
              {budgetInMillions === 0
                ? "No Data Yet"
                : budgetInMillions + " Millions"}
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">REVENUE</p>
            <p>
              {revenueInMillions === 0
                ? "No Data Yet"
                : revenueInMillions + " Millions"}
            </p>
          </div>

          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">
              PRODUCTION COMPANIES
            </p>
            <div className="flex justify-start gap-8">
              {production_companies.map((company, i) => {
                return <p key={i}>{company.name}</p>;
              })}
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">
              PRODUCTION COUNTRIES
            </p>
            <div className="flex justify-start gap-8">
              {production_countries.map((country, i) => {
                return <p key={i}>{country.name}</p>;
              })}
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold tracking-wider mb-2">
              AUDIO LANGUAGE
            </p>
            <div className="flex justify-start gap-6">
              {spoken_languages.map((language, i) => {
                return <p key={i}>{language.english_name}</p>;
              })}
            </div>
          </div>
        </div>
      )}

      {showDetail === 1 && (
        <div>
          <ScrollSmallImages title={"Customer Also Watch"} list={list} />
          <div className="w-full h-40 bg-inherit" />
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
