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
    //cloudinary pe upload
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "interviewiq/resumes",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(req.file.buffer);
    });

    //resume pdf ki parsing
    const parser = new PDFParse({
      data: req.file.buffer,
    });

    const pdfResult = await parser.getText();
    await parser.destroy();

    //agar blank pdf hui toh
    if (!pdfResult.text?.trim()) {
      return res.status(400).json({
        message: "Could not extract text from this PDF.",
      });
    }
    //db me resume ko save
    const existingResume = await Resume.findOne({
      userId: req.userId,
    });

    let resume;

    if (existingResume) {
      // Replace existing resume
      resume = await Resume.findOneAndUpdate(
        { userId: req.userId },
        {
          fileName: req.file.originalname,
          fileType: req.file.mimetype,
          fileUrl: result.secure_url,
          extractedText: pdfResult.text,
          // New resume means old AI analysis is no longer valid.
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
        },
        {
          returnDocument: "after",
        },
      );
    } else {
      // First resume
      resume = await Resume.create({
        userId: req.userId,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileUrl: result.secure_url,
        extractedText: pdfResult.text,
      });
    }

    return res.status(201).json({
      message: existingResume
        ? "Resume replaced successfully"
        : "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error("upload rsume error", error);
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getResume = async (req,res) =>{
  try {
    const resume = await Resume.findOne({userId: req.userId}).sort({createdAt: -1});

    if(!resume) return res.status(404).json({message: "No Resume found"});

    return res.status(200).json({resume,});
  } catch (error) {
    console.error("get resume erroe ", error);
    return res.status(500).json({message: error.message});
  }
}

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

    const analysis = await analyzeResume(resume.extractedText);
    resume.analysis = {
      ...analysis,
      analyzedAt: new Date(),
    };

    await resume.save();

    return res.status(200).json({
      message: "Resume analyzed successfully",
      analysis: resume.analysis,
    });

  } catch (error) {
    console.error("Analyze resume error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};