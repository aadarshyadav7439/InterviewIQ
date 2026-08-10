import Joi from "joi";

const signupSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(50).required(),
});

export const validateSignUp = (req,res,next)=>{
    const {error} = signupSchema.validate(req.body);
    console.log(error);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    }
    next();
};