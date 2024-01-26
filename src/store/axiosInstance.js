import axios from "axios";

const BASIC_URL = "http://localhost:8000";

export const axiosApi = axios.create({
  baseURL: BASIC_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApi.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "token " + token;
  } else {
    console.log("error");
  }
  return config;
});
