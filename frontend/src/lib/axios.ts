// src/lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://wellnessspace.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
