import "dotenv/config";
import express from "express";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://interview-npg5lhiin-aadarsh14.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/community", communityRoutes);

connectDB();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("InterviewIq api is running successfully.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
