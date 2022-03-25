import { object, string } from "yup";

let createClientDefaultValues = {
  displayName: "",
  tradeName: "",
  category: "",
  subCategory: "",
  clientManager: "",
  email: "",
  mobileNumber: "",
};

let CreateClientSchema = object().shape({
  displayName: string()
    .required("Display name is required")
    .min(3, "Display name should be atleast 3 characters")
    .max(12, "Display name should not exceed 12 characters"),
  tradeName: string()
    .required("Display name is required")
    .min(3, "Display name should be atleast 3 characters")
    .max(12, "Display name should not exceed 12 characters"),
  clientManager: string().required("Select a client manager"),
  category: string().required("Category is required"),
  subCategory: string().notRequired(),
  email: string().email("Invalid email address").required("Email is required"),
  mobileNumber: string()
    .required("Mobile number is required")
    .min(10, "Mobile number should be atleast 10 digits")
    .max(10, "Mobile number should not exceed 10 digits"),
});

export { createClientDefaultValues, CreateClientSchema };
