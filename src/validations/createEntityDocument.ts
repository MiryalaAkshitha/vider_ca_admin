import { object, string } from "yup";

let createEntityDocumentDefaultValues = {
    licenseType: "",
    licenseTitle: "",
    licenseNumber: "",
    
   

};

let CreateEntityDocumentSchema = object().shape({
    bankName: string().notRequired(),
    branchName: string().notRequired(),
    accountNumber: string().notRequired(),
    ifscCode: string().notRequired(),
    upiId: string().notRequired(),
    

});

export { createEntityDocumentDefaultValues, CreateEntityDocumentSchema };