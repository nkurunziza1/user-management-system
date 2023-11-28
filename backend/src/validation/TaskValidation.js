import Joi from "joi";

const taskSchema = Joi.object({
    name: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    assignee: Joi.string().required(), 
    project: Joi.string().required(), 
    description: Joi.string().required(),
    priority: Joi.string().valid('Low', 'Medium', 'High').required(),
    attachment: Joi.string().required(),
  });
  
  export const taskValidation = (req, res, next) => {
    const { error } = taskSchema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        message: error.details.map((detail) => detail.message),
      });
    } else {
      next();
    }
  };