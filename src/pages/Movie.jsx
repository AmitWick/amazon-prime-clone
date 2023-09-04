import LazyLoad from "../components/LazyLoad";

const Movie = () => {
  return (
    <>
      <LazyLoad
        title={"Trending Movies"}
        queryKey={"trendingMovie"}
        url={"/trending/movie/day"}
        threshold={1}
      />

      <LazyLoad
        title={"In The Theatre"}
        queryKey={"nowPlayingMovie"}
        url={"/movie/now_playing"}
        threshold={1}
      />

      <LazyLoad
        title={"Popular Movie"}
        queryKey={"popularMovie"}
        url={"/movie/popular"}
        threshold={1}
      />

      <LazyLoad
        title={"Top Rated Movie"}
        queryKey={"topRatedMovie"}
        url={"/movie/top_rated"}
        threshold={1}
      />

      <LazyLoad
        title={"Upcoming Movie"}
        queryKey={"upcomingMovie"}
        url={"/movie/upcoming"}
        threshold={1}
      />
    </>
  );
};

export default Movie;
