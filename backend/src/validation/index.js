// Validation Middleware
import Joi from 'joi';

// User Validation (Common for all roles)
export const validateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'string.min': 'Name must have at least 3 characters',
      'string.max': 'Name can have at most 50 characters',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email',
      'string.empty': 'Email is required',
    }),
    password: Joi.string().min(6).max(30).required().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password must have at least 6 characters',
      'string.max': 'Password can have at most 30 characters',
    }),
    cnic: Joi.string().optional().regex(/^[0-9]{13}$/).allow(null).messages({
      'string.pattern.base': 'CNIC must be a 13-digit number',
    }),
    role: Joi.string().valid('admin', 'donor', 'receiver').default('receiver').messages({
      'string.empty': 'Role is required',
      'any.only': 'Role must be one of admin, donor, or receiver',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Donor-Specific Validation
export const validateDonor = (req, res, next) => {
  const schema = Joi.object({
    availability: Joi.boolean().required().messages({
      'boolean.base': 'Availability must be true or false',
      'any.required': 'Availability is required',
    }),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .required()
      .messages({
        'string.empty': 'Blood group is required',
        'any.only': 'Invalid blood group',
      }),
    location: Joi.string().min(3).max(100).required().messages({
      'string.base': 'Location must be a string',
      'string.empty': 'Location is required',
      'string.min': 'Location must have at least 3 characters',
      'string.max': 'Location can have at most 100 characters',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Receiver-Specific Validation
export const validateReceiver = (req, res, next) => {
  const schema = Joi.object({
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .required()
      .messages({
        'string.empty': 'Blood group is required',
        'any.only': 'Invalid blood group',
      }),
    location: Joi.string().min(3).max(100).required().messages({
      'string.base': 'Location must be a string',
      'string.empty': 'Location is required',
      'string.min': 'Location must have at least 3 characters',
      'string.max': 'Location can have at most 100 characters',
    }),
    urgency: Joi.string().valid('low', 'medium', 'high').required().messages({
      'string.empty': 'Urgency is required',
      'any.only': 'Urgency must be one of low, medium, or high',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Admin-Specific Validation
export const validateAdmin = (req, res, next) => {
  const schema = Joi.object({
    action: Joi.string().valid('approve', 'reject', 'delete').required().messages({
      'string.empty': 'Action is required',
      'any.only': 'Action must be one of approve, reject, or delete',
    }),
    userId: Joi.string().required().messages({
      'string.empty': 'User ID is required',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};