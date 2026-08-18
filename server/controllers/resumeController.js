import Resume from "../models/Resume.js";
import cloudinary from "../config/cloudinary.js";
import { PDFParse } from "pdf-parse";
import { analyzeResume } from "../services/geminiServices.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume",
      });
    }

    // Upload the new resume to Cloudinary first
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "interviewiq/resumes",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      uploadStream.end(req.file.buffer);
    });

    // Parse the new PDF
    const parser = new PDFParse({
      data: req.file.buffer,
    });

    const pdfResult = await parser.getText();
    await parser.destroy();

    // If parsing fails, delete the newly uploaded Cloudinary file
    if (!pdfResult.text?.trim()) {
      try {
        await cloudinary.uploader.destroy(result.public_id, {
          resource_type: "raw",
        });
      } catch (cloudinaryError) {
        console.error(
          "Failed to clean up new Cloudinary resume:",
          cloudinaryError,
        );
      }

      return res.status(400).json({
        message: "Could not extract text from this PDF.",
      });
    }

    // Find the user's current resume
    const existingResume = await Resume.findOne({
      userId: req.userId,
    });

    // If a resume already exists, delete the old one
    if (existingResume) {
      // Delete old file from Cloudinary
      if (existingResume.cloudinaryPublicId) {
        try {
          await cloudinary.uploader.destroy(
            existingResume.cloudinaryPublicId,
            {
              resource_type: "raw",
            },
          );
        } catch (cloudinaryError) {
          console.error(
            "Failed to delete old Cloudinary resume:",
            cloudinaryError,
          );
        }
      }

      // Delete old resume document from MongoDB
      await Resume.deleteOne({
        _id: existingResume._id,
      });
    }

    // Create the new resume document
    const resume = await Resume.create({
      userId: req.userId,
      fileUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      extractedText: pdfResult.text,

      // New resume starts without AI analysis
      analysis: {
        overallScore: null,
        summary: "",
        skills: [],
        projects: [],
        education: [],
        experience: [],
        certifications: [],
        achievements: [],
        missingKeywords: [],
        strengths: [],
        weaknesses: [],
        suggestions: [],
        analyzedAt: null,
      },
    });

    return res.status(201).json({
      message: existingResume
        ? "Resume replaced successfully"
        : "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error("Upload resume error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "No Resume found",
      });
    }

    return res.status(200).json({
      resume,
    });
  } catch (error) {
    console.error("Get resume error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const analyzeUserResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "No resume found",
      });
    }

    if (!resume.extractedText?.trim()) {
      return res.status(400).json({
        message: "Resume text is not available for analysis",
      });
    }

    // Send extracted resume text to Gemini
    const analysis = await analyzeResume(resume.extractedText);

    // Save Gemini analysis to MongoDB
    const updatedResume = await Resume.findOneAndUpdate(
      {
        userId: req.userId,
      },
      {
        $set: {
          "analysis.overallScore": analysis.overallScore,
          "analysis.summary": analysis.summary,
          "analysis.skills": analysis.skills,
          "analysis.projects": analysis.projects,
          "analysis.education": analysis.education,
          "analysis.experience": analysis.experience,
          "analysis.certifications": analysis.certifications,
          "analysis.achievements": analysis.achievements,
          "analysis.missingKeywords": analysis.missingKeywords,
          "analysis.strengths": analysis.strengths,
          "analysis.weaknesses": analysis.weaknesses,
          "analysis.suggestions": analysis.suggestions,
          "analysis.analyzedAt": new Date(),
        },
      },
      {
        returnDocument: "after",
      },
    );

    return res.status(200).json({
      message: "Resume analyzed successfully",
      analysis: updatedResume.analysis,
    });
  } catch (error) {
    console.error("Analyze resume error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};