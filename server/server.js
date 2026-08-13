import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/resume", resumeRoutes);

connectDB();
const PORT = process.env.PORT || 8000; 

app.get("/",( req,res )=>{
    res.send("InterviewIq api is running successfully.")
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});