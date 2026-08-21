import Company from "../models/Company.js";
import { generateCompanyPreparation } from "../services/geminiServices.js";

export const prepareCompany = async (req, res) => {
  try {
    const { companyName, targetRole } = req.body;

    if (!companyName?.trim() || !targetRole?.trim()) {
      return res.status(400).json({
        message: "Company name and target role are required.",
      });
    }

    const preparation = await generateCompanyPreparation(companyName.trim(),targetRole.trim());

    const company = await Company.create({
      userId: req.userId,
      companyName: companyName.trim(),
      targetRole: targetRole.trim(),
      overview: preparation.overview || "",
      importantTopics: preparation.importantTopics || [],
      importantSkills: preparation.importantSkills || [],
      likelyQuestions: preparation.likelyQuestions || [],
      preparationTips: preparation.preparationTips || [],
    });

    return res.status(201).json({message: "Company preparation generated successfully.",company});
  } catch (error) {
    console.error("Company preparation error:", error);

    return res.status(500).json({
      message: error.message || "Unable to generate company preparation.",
    });
  }
};