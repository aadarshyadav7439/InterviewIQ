import api from "./api";

export const prepareCompany = async (companyName, targetRole) => {
  const response = await api.post("/companies/prepare", {companyName,targetRole});

  return response.data;
};