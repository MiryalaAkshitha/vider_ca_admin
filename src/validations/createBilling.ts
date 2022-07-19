import { object, string } from "yup";

let createBillingDefaultValues = {
  legalName: "",
  tradeName: "",
  category: "",
  email: "",
  mobileNumber: "",
};

let CreateBillingSchema = object().shape({
  legalName: string()
    .required("Legal Name is required")
    .min(3, "Legal name should be atleast 3 characters"),
  tradeName: string().notRequired(),
  category: string().required("Select a Billing Entity Category"),
  email: string().email("Invalid email address").required("Email is required"),
  mobileNumber: string()
    .required("Mobile number is required")
    .min(10, "Mobile number should be atleast 10 digits")
    .max(10, "Mobile number should not exceed 10 digits"),
});

export { createBillingDefaultValues, CreateBillingSchema };
