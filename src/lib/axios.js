import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapiserver.onrender.com",
  withCredentials: true,
});
