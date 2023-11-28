import * as yup from "yup";

export const signupSchema = yup.object().shape({
  fullname: yup.string().min(4).max(30).trim().required(),
  email: yup
    .string()
    .email()
    .lowercase()
    .trim()
    .matches(/^\S+@\S+\.\S+$/, "Invalid email format")
    .required(),
  password: yup
    .string()
    .min(6, "Password must be atleast 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase character")
    .matches(/[0-9]/, "Password must contain at least one numeric character")
    .required("Password is required"),
});
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .lowercase()
    .trim()
    .matches(/^\S+@\S+\.\S+$/, "Invalid email format")
    .required(),
  password: yup
    .string()
    .min(6, "Password must be atleast 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase character")
    .matches(/[0-9]/, "Password must contain at least one numeric character")
    .required("Password is required"),
});

export const ResetSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])/,
      "Password must contain at least one lowercase letter and one numeric digit"
    ),
  password2: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const ForgetPasswordSchema = yup.object().shape({
  email: yup.string().email().lowercase().trim().required(),
});

export const TaskFormSchema = yup.object().shape({
  taskName: yup.string().min(4, "Task name is required "),
  description: yup.string().min(4, "Description is required "),
});
