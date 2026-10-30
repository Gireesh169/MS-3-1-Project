import axios from "axios";

/**
 * Centralized Axios client for ScholarSphere Digital Platform.
 * All requests route strictly through the Spring Cloud API Gateway on port 8090.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL !== undefined
    ? import.meta.env.VITE_API_BASE_URL
    : "";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach JWT token to all requests if authenticated
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401, 403, and network errors gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // Token expired or invalid
      console.warn("Unauthorized request (401). Clearing session...");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("email");

      // Redirect to login only if not already there
      if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/register") && window.location.pathname !== "/") {
        window.location.href = "/login?expired=true";
      }
    } else if (status === 403) {
      console.warn("Access denied (403): You do not have permission for this resource.");
    }

    return Promise.reject(error);
  }
);

// Re-export auth helpers for convenience and backwards compatibility
export {
  getToken,
  isLoggedIn,
  getCurrentUser,
  logout,
  login,
  register,
} from "./authService";

export default api;

