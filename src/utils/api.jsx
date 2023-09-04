import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_APP_API_TOKEN;

const headers = {
  Authorization: "bearer " + API_TOKEN,
};

const fetchDataFromApi = async (url, params) => {
  try {
    const response = await axios.get(BASE_URL + url, {
      headers,
      params: {
        language: "en-US",
        page: 1,
        region: "IN",
        ...params,
      },
    });
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataFromThunk = (name) => {
  return createAsyncThunk(name, async (url, params) => {
    const response = await fetchDataFromApi(url, params);

    localStorage.setItem(name, JSON.stringify(response));
    return response;
  });
};

export default fetchDataFromApi;
