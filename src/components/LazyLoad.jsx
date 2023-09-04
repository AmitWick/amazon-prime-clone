/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import fetchDataFromApi from "../utils/api";
import ScrollSmallImages from "./ScrollSmallImages";
import ScrollPeople from "./ScrollPeople";

const LazyLoad = ({
  threshold = 0.5,
  queryKey,
  url,
  title,
  type = "entertain",
}) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: threshold,
  });

  const { isLoading, isError, data } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => await fetchDataFromApi(url),
    enabled: inView,
    staleTime: Infinity,
  });

  if (type === "person") {
    return (
      <div ref={ref}>
        <ScrollPeople
          title={title}
          isLoading={isLoading}
          isError={isError}
          data={data?.results}
        />
      </div>
    );
  } else {
    return (
      <div ref={ref}>
        <ScrollSmallImages
          title={title}
          isLoading={isLoading}
          isError={isError}
          list={data?.results}
        />
      </div>
    );
  }
};

export default LazyLoad;
