import api from "./api";

export const getInterviews = async () => {
  const response = await api.get("/interviews");
  return response.data;
};

export const getInterview = async (id) => {
  const response = await api.get(`/interviews/${id}`);
  return response.data;
};
export const createInterview = async (interviewData) => {
  const response = await api.post("/interviews", interviewData);
  return response.data;
};

// Update interview

export const updateInterview = async (id, interviewData) => {
  const response = await api.put(`/interviews/${id}`,interviewData);
  return response.data;
};

export const completeInterview = async (id) => {
  const response = await api.put(`/interviews/${id}/complete`);
  return response.data;
};