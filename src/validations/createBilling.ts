import { object, string } from "yup";

let createBillingDefaultValues = {
    name: "",
    category: "",
    type: "",
    registrationNumber: "",
    contactName: "",
    email: "",
    mobileNumber: "",
    gstRegistered: "",
    gstIn: "",
};

let CreateBillingSchema = object().shape({
    name: string()
        .required("Billing Entity Name is required")
        .min(3, "Display name should be atleast 3 characters")
        .max(12, "Display name should not exceed 12 characters"),
    category: string().required("Select a Billing Entity Category"),
    type: string().required("Select a Billing Entity Type"),
    registrationNumber: string().required(),
    contactName: string().required()
        .min(3, "Display name should be atleast 3 characters")
        .max(12, "Display name should not exceed 12 characters"),
    email: string().email("Invalid email address").required("Email is required"),
    mobileNumber: string().required("Mobile number is required")
        .min(10, "Mobile number should be atleast 10 digits")
        .max(10, "Mobile number should not exceed 10 digits"),
    gstRegistered: string().notRequired(),
    gstIn: string().notRequired(),

});

export { createBillingDefaultValues, CreateBillingSchema };