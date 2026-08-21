import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    targetRole: {
      type: String,
      required: true,
      trim: true,
    },

    overview: {
      type: String,
      default: "",
    },

    importantTopics: {
      type: [String],
      default: [],
    },

    importantSkills: {
      type: [String],
      default: [],
    },

    likelyQuestions: {
      type: [String],
      default: [],
    },

    preparationTips: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Company = mongoose.model("Company", companySchema);

export default Company;