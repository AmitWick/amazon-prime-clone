import LazyLoad from "../components/LazyLoad";

const Tv = () => {
  return (
    <>
      <LazyLoad
        title={"Trending TV Shows"}
        queryKey={"trendingTv"}
        url={"/trending/tv/day"}
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
        title={"Popular Tv Shows"}
        queryKey={"populatTv"}
        url={"/tv/popular"}
        threshold={1}
      />

      <LazyLoad
        title={"Top Rated Tv Shows"}
        queryKey={"topRatedTv"}
        url={"/tv/top_rated"}
        threshold={1}
      />
    </>
  );
};

export default Tv;
