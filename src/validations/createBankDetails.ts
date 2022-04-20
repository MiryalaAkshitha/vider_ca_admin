import { object, string, number } from "yup";

let createBankdetailsDefaultValues = {
    bankName: "",
    branchName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
   

};

let CreatebankDetailsSchema = object().shape({
    bankName: string()
    .required("Bank Name is required")
    .min(3, "Display name should be atleast 3 characters")
    .max(20, "Display name should not exceed 20 characters"),
    branchName: string().notRequired(),
    accountNumber: number().notRequired(),
    ifscCode: string()
    .required("IFSC code is required")
    .max(11, "IFSC code should be 11 characters"),
    upiId: string().notRequired(),
    

});

export { createBankdetailsDefaultValues, CreatebankDetailsSchema };