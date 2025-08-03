import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Login
export const loginUser = (email: string, password: string) =>
  api.post("/users/login", { email, password });

// Register
export const registerUser = (email: string, password: string) =>
  api.post("/users/register", { email, password });
