import axios from "axios";

/**
 * Centralized API configuration for ScholarSphere Digital.
 * 
 * - Authentication Service direct port: http://localhost:8081 (Default)
 * - Spring Cloud API Gateway port:     http://localhost:8080 (For microservice routing)
 */
export const BASE_URL = "http://localhost:8081";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token to outgoing requests if available
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------------------------------------
// Authentication & Session Helper Functions
// ---------------------------------------------------------------------------

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
  const token = getToken();
  return !!token && token !== "null" && token !== "undefined";
};

export const getUser = () => {
  return {
    username: localStorage.getItem("username") || "Student",
    role: localStorage.getItem("role") || "USER",
    email: localStorage.getItem("email") || "",
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
};

// ---------------------------------------------------------------------------
// API Calls
// ---------------------------------------------------------------------------

/**
 * Register a new user with ScholarSphere Digital
 * @param {Object} userData - { username, email, password, role }
 */
export const registerUser = async (userData) => {
  const response = await api.post("/api/auth/register", {
    username: userData.username.trim(),
    email: userData.email.trim(),
    password: userData.password,
    role: userData.role || "USER",
  });

  // Save registered role to help infer in case backend returns plain token on login
  localStorage.setItem(`user_role_${userData.username.trim().toLowerCase()}`, userData.role || "USER");

  return response.data;
};

/**
 * Login user and store authentication session
 * Supports both preferred JSON response: { token, username, role }
 * and raw string token from backend.
 * 
 * @param {Object} credentials - { username, password }
 * @param {string} [roleHint] - Optional role from selector for demo presentation
 */
export const loginUser = async (credentials, roleHint = null) => {
  const cleanUsername = credentials.username.trim();

  const response = await api.post("/api/auth/login", {
    username: cleanUsername,
    password: credentials.password,
  });

  const data = response.data;

  // Check if backend returned error text with 200 OK status
  if (typeof data === "string" && (data.toLowerCase().includes("invalid") || data.toLowerCase().includes("fail"))) {
    throw new Error(data || "Invalid username or password");
  }

  // Extract token: handles both JSON object { token, username, role } and raw string token
  const token = typeof data === "object" && data !== null ? data.token : data;
  if (!token) {
    throw new Error("No authentication token received from server");
  }

  // Determine username & role
  const resolvedUsername = (typeof data === "object" && data?.username) ? data.username : cleanUsername;
  const rememberedRole = localStorage.getItem(`user_role_${cleanUsername.toLowerCase()}`);
  const resolvedRole = (typeof data === "object" && data?.role)
    ? data.role
    : (roleHint || rememberedRole || (cleanUsername.toLowerCase().includes("admin") ? "ADMIN" : "USER"));

  // Store in localStorage as specified in requirements
  localStorage.setItem("token", token);
  localStorage.setItem("username", resolvedUsername);
  localStorage.setItem("role", resolvedRole);

  return {
    token,
    username: resolvedUsername,
    role: resolvedRole,
  };
};

export default api;
