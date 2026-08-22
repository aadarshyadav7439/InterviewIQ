import api from "./api";

export const getPosts = async () => {
  const response = await api.get("/community");
  return response.data;
};

export const createPost = async (postData) => {
  const response = await api.post("/community", postData);
  return response.data;
};

export const toggleLike = async (postId) => {
  const response = await api.post(`/community/${postId}/like`);
  return response.data;
};

export const addComment = async (postId, content) => {
  const response = await api.post(`/community/${postId}/comments`, {content});
  return response.data;
};