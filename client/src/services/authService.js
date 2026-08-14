import api from "./api";

export const signupUser = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};