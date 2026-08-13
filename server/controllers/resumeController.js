import Resume from "../models/Resume.js";
import cloudinary from "../config/cloudinary.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "interviewiq/resumes",
          resource_type: "raw",
        },
        (error, result) => {
  if (error) {
    console.log("CLOUDINARY ERROR FULL:", error);
    console.log("ERROR MESSAGE:", error?.message);
    console.log("HTTP CODE:", error?.http_code);
    console.log("ERROR NAME:", error?.name);
    reject(error);
  } else {
    resolve(result);
  }
}
      );

      uploadStream.end(req.file.buffer);
    });

    const resume = await Resume.create({
      userId: req.userId,
      fileName: req.file.originalname,
      fileUrl: result.secure_url,
    });

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