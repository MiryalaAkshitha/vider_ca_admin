import { object, string } from "yup";

let createBankdetailsDefaultValues = {
  bankName: "",
  branchName: "",
  accountNumber: "",
  ifscCode: "",
  upiId: "",
  upiAttachment: "",
};

let CreatebankDetailsSchema = object().shape({
  bankName: string()
    .required("Bank Name is required")
    .min(3, "Display name should be atleast 3 characters")
    .max(20, "Display name should not exceed 20 characters"),
  branchName: string().required("Branch Name is required"),
  accountNumber: string()
    .required("Account Number is required")
    .matches(
      /^[0-9]{9,18}$/,
      "Account number should be number and 9 to 18 digits"
    ),
  ifscCode: string()
    .required("IFSC code is required")
    .min(11, "IFSC code should be 11 characters long.")
    .max(11, "IFSC code should be 11 characters long.")
    .matches(/^[A-Z]{4}[0-9]{7}$/, "IFSC code should be valid"),
  upiId: string()
    .notRequired()
    .matches(/^([a-zA-Z0-9]{2,})@([a-zA-Z0-9]{2,})$/, "UPI ID should be valid"),
  upiAttachment: string().notRequired(),
});

export { createBankdetailsDefaultValues, CreatebankDetailsSchema };
