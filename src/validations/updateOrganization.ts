import { object, string } from "yup";

let updateOrganizationDefaultValues = {
  firmType: "",
  firmName: "",
  firstStatus: "",
};

let updateOrganizationSchema = object().shape({
  firmName: string()
    .required("Display name is required")
    .min(3, "Display name should be atleast 3 characters")
    .max(25, "Display name should not exceed 12 characters"),
  email: string().email("Invalid email address").required("Email is required"),
  mobileNumber: string()
    .required("Mobile number is required")
    .min(10, "Mobile number should be atleast 10 digits")
    .max(10, "Mobile number should not exceed 10 digits"),
  alternateMobileNumber: string()
    .required("Mobile number is required")
    .min(10, "Mobile number should be atleast 10 digits")
    .max(10, "Mobile number should not exceed 10 digits"),
});

export { updateOrganizationDefaultValues, updateOrganizationSchema };
