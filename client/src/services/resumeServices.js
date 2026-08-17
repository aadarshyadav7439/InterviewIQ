import api from "./api";

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  const response = await api.post("/resume", formData);
  return response.data;
};

export const getResume = async ()=>{
  const response = await api.get("/resume");
  return response.data; 
};

export const analyzeResume = async () => {
  const response = await api.post("/resume/analyze");
  return response.data;
};