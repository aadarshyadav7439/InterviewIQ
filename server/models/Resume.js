import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
      default: "",
    },
    analysis: {
      overallScore: {
        type: Number,
        default: null,
      },
      summary: {
        type: String,
        default: "",
      },
      skills: {
        type: [String],
        default: [],
      },
      projects: {
        type: [String],
        default: [],
      },
      education: {
        type: [String],
        default: [],
      },
      experience: {
        type: [String],
        default: [],
      },
      certifications: {
        type: [String],
        default: [],
      },
      achievements: {
        type: [String],
        default: [],
      },
      missingKeywords: {
        type: [String],
        default: [],
      },
      strengths: {
        type: [String],
        default: [],
      },
      weaknesses: {
        type: [String],
        default: [],
      },
      suggestions: {
        type: [String],
        default: [],
      },
      analyzedAt: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true },
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
