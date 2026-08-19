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

export const evaluateInterviewAnswer = async (id,questionId,answer) => {
  const response = await api.post(`/interviews/${id}/evaluate-answer`,{questionId, answer});
  return response.data;
};

export const generateInterviewQuestions = async(id) => {
  const response = await api.post(`/interviews/${id}/generate-questions`);
  return response.data;
};

export const updateInterview = async (id, interviewData) => {
  const response = await api.put(`/interviews/${id}`,interviewData);
  return response.data;
};

export const completeInterview = async (id) => {
  const response = await api.post(`/interviews/${id}/complete`);
  return response.data;
};