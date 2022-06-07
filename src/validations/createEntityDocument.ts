import { object, string } from "yup";

let createEntityDocumentDefaultValues = {
    licenseType: "",
    licenseTitle: "",
    licenseNumber: "",



};

let CreateEntityDocumentSchema = object().shape({
    licenseType: string().required(),
    licenseTitle: string().required(),
    licenseNumber: string().required(),


});

export { createEntityDocumentDefaultValues, CreateEntityDocumentSchema };