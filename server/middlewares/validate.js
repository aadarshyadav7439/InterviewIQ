import Joi from "joi";

const signupSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(50).required(),
});

const profileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50),
  avatar: Joi.string().allow(""),
  college: Joi.string().trim().max(100).allow(""),
  degree: Joi.string().trim().max(100).allow(""),
  branch: Joi.string().trim().max(100).allow(""),
  graduationYear: Joi.number().integer().min(2000).max(2100),
  skills: Joi.array().items(Joi.string().trim().min(1).max(50)),
  targetCompany: Joi.string().trim().max(100).allow(""),
  targetRole: Joi.string().trim().max(100).allow(""),
});

export const validateSignUp = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);

  console.log(error);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};

export const validateProfile = (req, res, next) => {
  const { error } = profileSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};
