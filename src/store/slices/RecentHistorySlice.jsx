/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("recentHistory")) || null;

const RecentHistorySlice = createSlice({
  name: "RecentHistorySlice",
  initialState,
  reducers: {
    addRecentHistory: (state, { payload }) => {
      if (!state) {
        state = [];
      }
      if (state.length > 10) {
        state.pop();
      }

      state = [payload, ...state];

      localStorage.setItem("recentHistory", JSON.stringify(state));
    },
  },
});

export const { addRecentHistory } = RecentHistorySlice.actions;
export const RecentHistoryReducer = RecentHistorySlice.reducer;

export const recentHistoryInitialState = (state) => state.recentHistory;
