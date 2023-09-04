import { configureStore } from "@reduxjs/toolkit";
import { RecentHistoryReducer } from "./slices/RecentHistorySlice";

const store = configureStore({
  reducer: {
    recentHistory: RecentHistoryReducer,
  },
});

export default store;
