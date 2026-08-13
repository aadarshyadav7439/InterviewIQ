import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    interviewType: {
      type: String,
      enum: ["Technical", "HR", "Behavioral"],
      required: true,
    },
    score: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["started", "completed"],
      default: "started",
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          default: "",
        },
        score: {
          type: Number,
          default: null,
        },
        feedback: {
          type: String,
          default: "",
        },
      },
    ],
    
  },
  { timestamps: true },
);

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
