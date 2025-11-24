import axios from "axios";

// Create a single axios instance
export const axiosInstance = axios.create({
  baseURL: "https://chatapiserver.onrender.com",
  withCredentials: true, // allow cookies to be sent
});

// Login user
export const loginUser = async (email, password) => {
  try {
    const res = await axiosInstance.post("/api/auth/login", { email, password });
    console.log("Login success:", res.data);
    return res.data; // return user data if needed
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err; // throw error to handle in frontend
  }
};

// Signup user
export const signupUser = async (name, email, password) => {
  try {
    const res = await axiosInstance.post("/api/auth/signup", { name, email, password });
    console.log("Signup success:", res.data);
    return res.data;
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    throw err;
  }
};

// Check auth
export const checkAuth = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/check");
    console.log("Authenticated user:", res.data);
    return res.data;
  } catch (err) {
    console.error("Auth check error:", err.response?.data || err.message);
    throw err;
  }
};
