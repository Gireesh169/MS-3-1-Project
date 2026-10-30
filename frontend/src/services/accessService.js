import api from "./api";

/**
 * Access Service API Client
 * Manages subscription plans, user subscriptions, and view/download permissions.
 */
export const createPlan = async (planData) => {
  const response = await api.post("/access/plans", planData);
  return response.data;
};

export const subscribe = async (username, planType) => {
  const response = await api.post("/access/subscribe", {
    username,
    planType,
  });
  return response.data;
};

export const getSubscription = async (username) => {
  try {
    const response = await api.get(`/access/subscription/${username}`);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return null; // No subscription found
    }
    throw err;
  }
};

export const canView = async (username, contentType) => {
  try {
    const response = await api.get(`/access/view/${username}/${contentType}`);
    return response.data === true;
  } catch (err) {
    console.error("Error verifying view access:", err);
    return false;
  }
};

export const canDownload = async (username, contentType) => {
  try {
    const response = await api.get(`/access/download/${username}/${contentType}`);
    return response.data === true;
  } catch (err) {
    console.error("Error verifying download access:", err);
    return false;
  }
};

export default {
  createPlan,
  subscribe,
  getSubscription,
  canView,
  canDownload,
};
