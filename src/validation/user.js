// SCHEMA VALIDATION
import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is a required field")
    .max(32, "Name must be at most 32 characters"),
  email: yup
    .string()
    .required("Email is a required field")
    .email("Email must be a valid email")
    .matches(/.+\@.+\..+/, "Email must contain @")
    .min(4, "Email must be at least 4 characters long")
    .max(32, "Email must be at most 32 characters"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /(?=.*?[a-z])/,
      "Password must contain at least a lowercase letter"
    )
    .matches(
      /(?=.*?[A-Z])/,
      "Password must contain at least a uppercase letter"
    )
    .matches(/(?=.*?[0-9])/, "Password must contain at least one digit"),
});

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is a required field")
    .email("Email must be a valid email")
    .matches(/.+\@.+\..+/, "Email must contain @")
    .min(4, "Email must be at least 4 characters long")
    .max(32, "Email must be at most 32 characters"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /(?=.*?[a-z])/,
      "Password must contain at least a lowercase letter"
    )
    .matches(
      /(?=.*?[A-Z])/,
      "Password must contain at least a uppercase letter"
    )
    .matches(/(?=.*?[0-9])/, "Password must contain at least one digit"),
});
