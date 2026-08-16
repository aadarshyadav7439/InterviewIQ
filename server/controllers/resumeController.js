import Resume from "../models/Resume.js";
import cloudinary from "../config/cloudinary.js";
import { PDFParse } from "pdf-parse";

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

    //db me resume ko save
    const existingResume = await Resume.findOne({
      userId: req.userId,
    });

    let resume;

    if (existingResume) {
      resume = await Resume.findOneAndUpdate(
        { userId: req.userId },
        {
          fileName: req.file.originalname,
          fileUrl: result.secure_url,
          extractedText: pdfResult.text,
        },
        {
          new: true,
        },
      );
    } else {
      resume = await Resume.create({
        userId: req.userId,
        fileName: req.file.originalname,
        fileUrl: result.secure_url,
        extractedText: pdfResult.text,
      });
    }

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

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
    console.log(error);
    res.status(500).json({message: error.message});
  }
}