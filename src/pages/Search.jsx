import React from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import fetchDataFromApi from "../utils/api";
import { useState } from "react";
import ScrollSmallImages from "../components/ScrollSmallImages";

const Search = () => {
  const [multiList, setMultiList] = useState(null);
  const { type } = useParams();
  const {
    state: { searchInput },
  } = useLocation();

  useEffect(() => {
    (async () => {
      const response = await fetchDataFromApi("/search/multi", {
        query: searchInput,
        include_adult: true,
      });

      setMultiList(response.results);
    })();
  }, [searchInput]);

  if (multiList === null) {
    return <h1>Loading Data..........</h1>;
  }

  console.log(multiList);

  const movieArray = multiList.filter((multi) => {
    return multi.media_type === "movie";
  });
  const tvArray = multiList.filter((multi) => {
    return multi.media_type === "tv";
  });

  console.log("Movie Array", movieArray);
  console.log("TV SHows", tvArray);

  return (
    <>
      <ScrollSmallImages title={"Movie Searched...."} list={movieArray} />
      <ScrollSmallImages title={"TV Shows Searched...."} list={tvArray} />
    </>
  );
};

export default Search;
