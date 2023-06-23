import { mixed, object, string } from "yup";

let createClientDefaultValues = {
  displayName: "",
  category: "",
  subCategory: "",
  clientManager: null,
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
  clientPortalAccess: "no",
};

let CreateClientSchema = ({ subCategoriesExist }) =>
  object().shape({
    displayName: string().required("Display Name is required"),
    tradeName: string().notRequired(),
    clientManager: object().nullable().notRequired(),
    category: string().required("Category is required"),
    subCategory: mixed().when("category", {
      is: (category: any) => subCategoriesExist(category),
      then: string().required("Sub Category is required"),
      otherwise: string().notRequired(),
    }),
    email: string().email("Invalid email address").required("Email is required"),
    mobileNumber: string()
      .required("Mobile number is required")
      .matches(/^[1-9]{1}[0-9]{9}$/, "Mobile number is invalid"),
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
    middleName: string().notRequired(),
    clientPortalAccess: string().required("Client Portal Access is required"),
  });

export { createClientDefaultValues, CreateClientSchema };
