import Joi from "joi";
const registerSchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(6).required(),
    fullname: Joi.string().min(3).max(30).required(),
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(6).required(),
  });

  export { registerSchema, loginSchema };