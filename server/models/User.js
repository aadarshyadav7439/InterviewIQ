import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    //ye signup ke wakt lenge
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    // Profile information
    avatar: {
        type: String,
        default: "",
    },

    college: {
        type: String,
        default: "",
        trim: true,
    },

    degree: {
        type: String,
        default: "",
        trim: true,
    },

    branch: {
        type: String,
        default: "",
        trim: true,
    },

    graduationYear: {
        type: Number,
        default: null,
    },

    skills: {
        type: [String],
        default: [],
    },

    targetCompany: {
        type: String,
        default: "",
        trim: true,
    },

    targetRole: {
        type: String,
        default: "",
        trim: true,
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;