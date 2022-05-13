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
    registrationNumber: string().notRequired(),
    contactName: string().notRequired(),
    email: string().notRequired(),
    mobileNumber: string().notRequired(),
    gstRegistered: string().notRequired(),
    gstIn: string().notRequired(),

});

export { createBillingDefaultValues, CreateBillingSchema };