import { object, string } from "yup";

let createClientDefaultValues = {
  displayName: "",
  category: "",
  subCategory: "",
  clientManager: "",
  authorizedPersonName: "",
  designation: "",
  email: "",
  mobileNumber: "",
  gstRegistered: "",
  gstNumber:"",
  panNumber: "",
  lastName: "",
  fullName:"",
  legalName:"",
  tradeName: "",
  placeOfSupply:"",
  constitutionOfBusiness:"",
  
};

let CreateClientSchema = object().shape({
  displayName: string()
.notRequired(),
  tradeName: string().notRequired(),
  clientManager: string().required("Select a client manager"),
  category: string().required("Category is required"),
  subCategory: string().notRequired(),
  email: string().email("Invalid email address").required("Email is required"),
  gstRegistered: string().notRequired(),
  lastName: string().notRequired(),
  fullName: string().notRequired(),
  panNumber: string().notRequired(),
  gstNumber: string().notRequired(),
  authorizedPersonName: string().notRequired(),
  designation: string().notRequired(),
  mobileNumber: string()
    .required("Mobile number is required")
    .min(10, "Mobile number should be atleast 10 digits")
    .max(10, "Mobile number should not exceed 10 digits"),
    legalName: string().notRequired(),
    placeOfSupply: string().notRequired(),
    constitutionOfBusiness: string().notRequired(),
});


export { createClientDefaultValues, CreateClientSchema };
