import api from "./api";

/**
 * Usage Service API Client
 * Tracks reading telemetry, history, access counts, and leaderboard analytics.
 */
export const recordUsage = async ({ bookId, bookTitle, durationMinutes = 0 }) => {
  const response = await api.post("/usage/record", {
    bookId,
    bookTitle,
    durationMinutes,
  });
  return response.data;
};

export const getMyHistory = async () => {
  const response = await api.get("/usage/history/my-history");
  return response.data || [];
};

export const getUserHistory = async (userId) => {
  const response = await api.get(`/usage/history/user/${userId}`);
  return response.data || [];
};

export const getMyBookAccessCount = async (bookId) => {
  const response = await api.get(`/usage/count/book/${bookId}`);
  return response.data;
};

export const getUserBookAccessCount = async (userId, bookId) => {
  const response = await api.get(`/usage/count/user/${userId}/book/${bookId}`);
  return response.data;
};

export const getBookStats = async (bookId) => {
  const response = await api.get(`/usage/stats/book/${bookId}`);
  return response.data;
};

export const getMyStats = async () => {
  const response = await api.get("/usage/stats/my-stats");
  return response.data;
};

export const getUserStats = async (userId) => {
  const response = await api.get(`/usage/stats/user/${userId}`);
  return response.data;
};

export const getMostAccessed = async (limit = 5) => {
  const response = await api.get(`/usage/stats/most-accessed?limit=${limit}`);
  return response.data || [];
};

export default {
  recordUsage,
  getMyHistory,
  getUserHistory,
  getMyBookAccessCount,
  getUserBookAccessCount,
  getBookStats,
  getMyStats,
  getUserStats,
  getMostAccessed,
};
