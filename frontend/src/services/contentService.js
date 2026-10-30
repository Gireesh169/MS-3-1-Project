import api from "./api";

/**
 * Content Service API Client
 * Manages books, academic journals, and research documents.
 */
export const getAllContent = async () => {
  const response = await api.get("/content");
  return response.data || [];
};

export const getContentById = async (id) => {
  const response = await api.get(`/content/${id}`);
  return response.data;
};

export const createContent = async (contentData) => {
  const response = await api.post("/content", contentData);
  return response.data;
};

/**
 * Upload content with an optional digital document (PDF/file)
 * Uses multipart/form-data with 'content' part (JSON) and 'file' part.
 */
export const uploadContent = async (contentData, file) => {
  const formData = new FormData();

  const contentBlob = new Blob([JSON.stringify(contentData)], {
    type: "application/json",
  });
  formData.append("content", contentBlob);

  if (file) {
    formData.append("file", file);
  }

  const response = await api.post("/content/upload", formData, {
    headers: {
      "Content-Type": undefined, // Let the browser set multipart boundary
    },
  });

  return response.data;
};

export const deleteContent = async (id) => {
  const response = await api.delete(`/content/${id}`);
  return response.data;
};

export default {
  getAllContent,
  getContentById,
  createContent,
  uploadContent,
  deleteContent,
};
