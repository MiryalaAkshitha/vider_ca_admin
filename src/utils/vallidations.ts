import * as yup from "yup";

let createClientDefaultValues = {
  displayName: "",
  tradeName: "",
  category: "",
  subCategory: "",
  clientManager: "",
  email: "",
  mobileNumber: "",
};

let CreateClientSchema = yup.object().shape({
  displayName: yup
    .string()
    .required("Display name is required")
    .min(3, "Display name should be atleast 3 characters")
    .max(12, "Display name should not exceed 12 characters"),
  tradeName: yup
    .string()
    .required("Display name is required")
    .min(3, "Display name should be atleast 3 characters")
    .max(12, "Display name should not exceed 12 characters"),
  clientManager: yup.string().required("Select a client manager"),
  category: yup.string().required("Category is required"),
  subCategory: yup.string().notRequired(),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .min(10, "Mobile number should be atleast 10 digits")
    .max(10, "Mobile number should not exceed 10 digits"),
});

export { createClientDefaultValues, CreateClientSchema };
