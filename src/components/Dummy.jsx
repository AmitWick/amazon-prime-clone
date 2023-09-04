// import React, { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import fetchDataFromApi from "../utils/api";
// import ScrollSmallImages from "../components/ScrollSmallImages";

// const TvSeason = () => {
//   const { typeId, seasonNum } = useParams();
//   const [tvSeasonInfo, setTvSeasonInfo] = useState(null);
//   const { state } = useLocation();
//   const { tvInfo, entertainList } = state;

//   const [isWatchlist, setIsWatchlist] = useState(false);

//   useEffect(() => {
//     const fetchTvSeasonInfo = async () => {
//       try {
//         const response = await fetchDataFromApi(
//           `/tv/${typeId}/season/${seasonNum}`
//         );
//         setTvSeasonInfo(response);

//         document.title = "TV Shows: " + tvInfo.name + " " + response.name;

//         // Check if the TV season is in the watchlist
//         const watchlist =
//           JSON.parse(localStorage.getItem("watchlistTvSeason")) || [];
//         const checkExistingTvSeason = watchlist.find(
//           (tv) => tv.id === response.id && tv.selectSeasonNum === seasonNum
//         );

//         if (checkExistingTvSeason) {
//           setIsWatchlist(true);
//         } else {
//           setIsWatchlist(false);
//         }
//       } catch (error) {
//         console.error("Error fetching TV season info:", error);
//       }
//     };

//     fetchTvSeasonInfo();
//   }, [typeId, seasonNum, tvInfo.name]);

//   const handleToggleWatchlist = () => {
//     const watchlist =
//       JSON.parse(localStorage.getItem("watchlistTvSeason")) || [];

//     if (isWatchlist) {
//       // Remove the TV season from watchlist
//       const updatedWatchlist = watchlist.filter(
//         (tv) => tv.id !== tvSeasonInfo.id || tv.selectSeasonNum !== seasonNum
//       );
//       localStorage.setItem(
//         "watchlistTvSeason",
//         JSON.stringify(updatedWatchlist)
//       );
//     } else {
//       // Add the TV season to watchlist
//       const newTvSeason = {
//         id: tvSeasonInfo.id,
//         selectSeasonNum: seasonNum,
//         ...tvInfo,
//         ...state,
//       };
//       localStorage.setItem(
//         "watchlistTvSeason",
//         JSON.stringify([...watchlist, newTvSeason])
//       );
//     }

//     // Toggle isWatchlist state
//     setIsWatchlist(!isWatchlist);
//   };

//   // ... (Rest of the component remains unchanged)

//   return (
//     <div className="flex flex-col w-full h-auto">
//       {/* ... (Rest of the component remains unchanged) */}
//       <div className="flex justify-start items-center gap-4">
//         <p>Total Episodes : {numberOfEpisodes.length}</p>
//       </div>
//       <div>
//         <p
//           className={`border-2 border-white rounded-lg px-4 py-2 cursor-pointer ${
//             isWatchlist ? "bg-gray-500 text-white" : ""
//           }`}
//           onClick={handleToggleWatchlist}
//         >
//           {isWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
//         </p>
//       </div>
//       {/* ... (Rest of the component remains unchanged) */}
//     </div>
//   );
// };

// export default TvSeason;
