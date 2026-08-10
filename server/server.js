import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth",authRoutes);

connectDB();
const PORT = process.env.PORT || 8000; 

app.get("/",( req,res )=>{
    res.send("InterviewIq api is running successfully.")
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});