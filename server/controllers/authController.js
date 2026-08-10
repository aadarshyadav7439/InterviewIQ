import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message : "User already exists"});

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password : hashedPassword,
        });

        res.status(201).json({
            message : "User created Successfully",
            user : {
                id : user._id,
                name : user._name,
                email : user.email,
            },
        });
    }catch(error){
        res.status(500).json({message : "Server Error"});
    }
}

export const login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({message : "Invalid EmailID or Password"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({message : "Invalid EmailID or Password"});
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id : user._id,
                name : user.name,
                email : user.email,
            },
        });
        
    }catch(error){
        res.status(500).json({message : "Server Error"});
    }
}