import axios from "axios";

const API = axios.create({
  baseURL: "https://parkeasenhck-backend.onrender.com/api",
});

// Attach token automatically if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register
export const register = async (data) => {
  return API.post("/auth/register", data);
};

// Login
export const login = async (data) => {
  return API.post("/auth/login", data);
};

// Get parking spots
export const getSpots = async () => {
  return API.get("/spots");
};

// Book a spot
export const bookSpot = async (spotId) => {
  return API.post("/bookings", { spotId });
};

// Unbook a spot
export const unbookSpot = async (spotId) => {
  return API.post("/bookings/unbook", { spotId });
};

// Get booking history (optionally filter by regNo)
export const getHistory = async (regNo = "") => {
  const query = regNo ? `?regNo=${encodeURIComponent(regNo)}` : "";
  return API.get(`/bookings/history${query}`);
};
