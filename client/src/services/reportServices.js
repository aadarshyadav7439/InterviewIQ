import api from "./api";

export const getReports = async () => {
  const response = await api.get("/reports");
  return response.data;
};