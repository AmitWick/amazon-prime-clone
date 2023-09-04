/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import Router from "./routes/Router";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { useQuery } from "@tanstack/react-query";
import fetchDataFromApi from "./utils/api";

function App() {
  const imageDetail = useQuery({
    queryKey: ["imageDetail"],
    queryFn: async () => await fetchDataFromApi("/configuration"),
    staleTime: Infinity,
  });

  if (imageDetail.isLoading) {
    return <h1>Loading Image Detail ........</h1>;
  }

  if (imageDetail.error !== `Missing queryFn for queryKey '["imageDetail"]'`) {
    if (imageDetail.isError) {
      return <h1>Error: {imageDetail.error}</h1>;
    }
  }

  return (
    <>
      <Router />
      <ScrollToTopButton />
    </>
  );
}

export default App;
