import api from "./api";

export const getInterviews = async () => {
  const response = await api.get("/interviews");
  return response.data;
};

export const createInterview = async (interviewData) => {
  const response = await api.post("/interviews", interviewData);
  return response.data;
};