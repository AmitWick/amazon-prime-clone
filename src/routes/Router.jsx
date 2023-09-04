import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import MainLayout from "../components/MainLayout";
import MovieDetail from "../pages/MovieDetail";
import Search from "../pages/Search";
import TvDetail from "../pages/TvDetail";
import Movie from "../pages/Movie";
import Tv from "../pages/Tv";
import TvSeason from "../pages/TvSeason";

import NotFound from "../components/NotFound";
import Watchlist from "../pages/Watchlist";
import PersonDetail from "../pages/PersonDetail";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="movie" element={<Movie />} />
        <Route path="tv" element={<Tv />} />
        <Route path="movie/:typeId" element={<MovieDetail />} />
        <Route path="search/:type" element={<Search />} />
        <Route path="tv/:typeId" element={<TvDetail />} />
        <Route path="person/:typeId/" element={<PersonDetail />} />
        <Route path="tv/:typeId/:seasonNum" element={<TvSeason />} />
        <Route path="watchlist" element={<Watchlist />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
