import api from "./api";

/**
 * Safely decodes base64 payload from a standard JWT token.
 * Extracts username (subject) and role claims.
 */
export const parseJwt = (token) => {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to parse JWT payload:", e);
    return null;
  }
};

/**
 * Register a new user.
 * Requirement: Default role must always be USER. Do not expose ADMIN.
 */
export const register = async ({ username, email, password }) => {
  const payload = {
    username: username.trim(),
    email: email.trim(),
    password: password,
    role: "USER", // Strictly enforced
  };

  const response = await api.post("/api/auth/register", payload);
  return response.data;
};

/**
 * Login user and store authentication session.
 * Handles both plain text JWT string and JSON object response.
 */
export const login = async ({ username, password }) => {
  const cleanUsername = username.trim();

  const response = await api.post("/api/auth/login", {
    username: cleanUsername,
    password: password,
  });

  const data = response.data;

  // Handle case where backend returns string error like "Invalid username or password"
  if (
    typeof data === "string" &&
    (data.toLowerCase().includes("invalid") || data.toLowerCase().includes("fail"))
  ) {
    throw new Error(data);
  }

  // Extract raw token
  const token = typeof data === "object" && data !== null ? data.token : data;
  if (!token) {
    throw new Error("No authentication token received from server");
  }

  // Parse claims directly from JWT token
  const claims = parseJwt(token);

  let resolvedUsername = cleanUsername;
  let resolvedRole = "USER";

  if (claims) {
    if (claims.sub) resolvedUsername = claims.sub;
    if (claims.role) {
      // Normalize ROLE_ADMIN / ADMIN, ROLE_USER / USER
      const r = claims.role.toUpperCase();
      resolvedRole = r.includes("ADMIN") ? "ADMIN" : "USER";
    }
  }

  // Store in localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("username", resolvedUsername);
  localStorage.setItem("role", resolvedRole);

  return {
    token,
    username: resolvedUsername,
    role: resolvedRole,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;

  return {
    username: localStorage.getItem("username") || "User",
    role: localStorage.getItem("role") || "USER",
    email: localStorage.getItem("email") || "",
    token,
  };
};

export const isLoggedIn = () => {
  const token = getToken();
  return !!token && token !== "null" && token !== "undefined";
};

export const isAdmin = () => {
  const role = localStorage.getItem("role");
  return role === "ADMIN" || role === "ROLE_ADMIN";
};

export default {
  register,
  login,
  logout,
  getToken,
  getCurrentUser,
  isLoggedIn,
  isAdmin,
  parseJwt,
};
