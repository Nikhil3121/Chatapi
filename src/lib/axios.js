import { axiosInstance } from "./axios";

// Login user
export const loginUser = async (email, password) => {
  try {
    const res = await axiosInstance.post("/api/auth/login", { email, password });
    console.log("Login success:", res.data);
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
  }
};

// Signup user
export const signupUser = async (name, email, password) => {
  try {
    const res = await axiosInstance.post("/api/auth/signup", { name, email, password });
    console.log("Signup success:", res.data);
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
  }
};

// Check auth
export const checkAuth = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/check");
    console.log("Authenticated user:", res.data);
  } catch (err) {
    console.error("Auth check error:", err.response?.data || err.message);
  }
};
