import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connection Success");
    } catch(error){
        console.error("Mongo DB connection Failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;