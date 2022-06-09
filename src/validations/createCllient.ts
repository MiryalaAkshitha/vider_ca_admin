import { mixed, object, string } from "yup";

let createClientDefaultValues = {
  displayName: "",
  category: "",
  subCategory: "",
  clientManager: "",
  authorizedPerson: "",
  designation: "",
  email: "",
  mobileNumber: "",
  gstRegistered: "yes",
  gstNumber: "",
  panNumber: "",
  firstName: "",
  lastName: "",
  fullName: "",
  legalName: "",
  tradeName: "",
  placeOfSupply: "",
  constitutionOfBusiness: "",
  gstVerified: false,
  panVerified: false,
};

let CreateClientSchema = ({ subCategoriesExist }) =>
  object().shape({
    displayName: string().required("Display Name is required"),
    tradeName: string().notRequired(),
    clientManager: string().notRequired(),
    category: string().required("Category is required"),
    subCategory: mixed().when("category", {
      is: (category: any) => subCategoriesExist(category),
      then: string().required("Sub Category is required"),
      otherwise: string().notRequired(),
    }),
    email: string()
      .email("Invalid email address")
      .required("Email is required"),
    mobileNumber: string()
      .required("Mobile number is required")
      .min(10, "Mobile number should be atleast 10 digits")
      .max(10, "Mobile number should not exceed 10 digits"),
    authorizedPerson: string().notRequired(),
    designation: string().notRequired(),
    gstRegistered: string().notRequired(),
    gstNumber: string().notRequired(),
    legalName: string().notRequired(),
    placeOfSupply: string().notRequired(),
    constitutionOfBusiness: string().notRequired(),
    panNumber: string().notRequired(),
    firstName: string().notRequired(),
    lastName: string().notRequired(),
    fullName: string().notRequired(),
  });

export { createClientDefaultValues, CreateClientSchema };
