/* eslint-disable react/no-children-prop */
import ImageScroller from "./components/ImageScroller";
import LazyLoad from "../../components/LazyLoad";
import ScrollSmallImages from "../../components/ScrollSmallImages";
import { useSelector } from "react-redux";
import { recentHistoryInitialState } from "../../store/slices/RecentHistorySlice";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchDataFromApi from "../../utils/api";
const Home = () => {
  const recentHistory = useSelector(recentHistoryInitialState);

  // eslint-disable-next-line no-unused-vars
  const [rerenderKey, setRerenderKey] = useState(0);
  // Whenever the `recentHistory` data changes, increment `rerenderKey`.
  useEffect(() => {
    setRerenderKey((prevKey) => prevKey + 1);
  }, [recentHistory]);

  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => await fetchDataFromApi("/trending/all/day"),
  });

  const filterEntertain = data?.results?.filter((entertain) => {
    return entertain.media_type === "movie" || entertain.media_type === "tv";
  });

  let newFilterEntertain;

  if (filterEntertain?.length > 8) {
    newFilterEntertain = filterEntertain.slice(0, 8);
  } else {
    newFilterEntertain = filterEntertain;
  }

  return (
    <div>
      <ImageScroller
        list={newFilterEntertain}
        isError={isError}
        isLoaing={isLoading}
        error={error}
      />
      {/* <RecentMovie /> */}

      <ScrollSmallImages title={"Recent History"} list={recentHistory} />

      <LazyLoad
        title={"Popular Persons"}
        queryKey={"popularPerson"}
        url={"/person/popular"}
        threshold={1}
        type={"person"}
      />

      <LazyLoad
        title={"Trending Movies"}
        queryKey={"trendingMovie"}
        url={"/trending/movie/day"}
        threshold={1}
      />

      <LazyLoad
        title={"Trending TV Shows"}
        queryKey={"trendingTv"}
        url={"/trending/tv/day"}
        threshold={1}
      />
      <LazyLoad
        title={"In The Theatre"}
        queryKey={"nowPlayingMovie"}
        url={"/movie/now_playing"}
        threshold={1}
      />

      <LazyLoad
        title={"Airing Today"}
        queryKey={"airingTodayTv"}
        url={"/tv/airing_today"}
        threshold={1}
      />

      <LazyLoad
        title={"On The Air"}
        queryKey={"onTheAirTv"}
        url={"/tv/on_the_air"}
        threshold={1}
      />
      <LazyLoad
        title={"Popular Movie"}
        queryKey={"popularMovie"}
        url={"/movie/popular"}
        threshold={1}
      />
      <LazyLoad
        title={"Popular Tv Shows"}
        queryKey={"populatTv"}
        url={"/tv/popular"}
        threshold={1}
      />

      <LazyLoad
        title={"Top Rated Movie"}
        queryKey={"topRatedMovie"}
        url={"/movie/top_rated"}
        threshold={1}
      />
      <LazyLoad
        title={"Top Rated Tv Shows"}
        queryKey={"topRatedTv"}
        url={"/tv/top_rated"}
        threshold={1}
      />
      <LazyLoad
        title={"Upcoming Movie"}
        queryKey={"upcomingMovie"}
        url={"/movie/upcoming"}
        threshold={1}
      />
    </div>
  );
};

export default Home;
