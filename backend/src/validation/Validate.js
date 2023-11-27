import Joi from "joi";

const validateForm = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });
const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError = new Error(
  "Password must contain At least one upper case,alphabet lower case one digit, special character. Minimum six in length"
);

const signupSchema = Joi.object({
  fullname: Joi.string().min(4).max(30).required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .regex(strongPasswordRegex)
    .error(stringPassswordError)
    .required(),
});

const validateSignup = validateForm(signupSchema);

export const signupValidation = (req, res, next) => {
  const { error } = validateSignup(req.body);
  if (error) {
    res.status(400).json({
      message:
        "Password must contain At least one upper case,alphabet lower case one digit, special character. Minimum six in length",
    });
  } else {
    next();
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    .regex(strongPasswordRegex)
    .error(stringPassswordError)
    .required(),
});

const validateLogin = validateForm(loginSchema);

export const loginValidation = (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) {
    res.status(404).json({ message: "Email not found" });
  } else {
    next();
  }
};

const updateSchema = Joi.object({
  password: Joi.string()
    .regex(strongPasswordRegex)
    .error(stringPassswordError)
    .required(),
});
const validateUpdate = validateForm(updateSchema);

export const updateValidate = (req, res, next) => {
  const { error } = validateUpdate(req.body);
  if (error) {
    res.status(404).json({
      message:
        "Password must contain At least one upper case,alphabet lower case one digit, special character. Minimum six in length",
    });
  } else {
    next();
  }
};
