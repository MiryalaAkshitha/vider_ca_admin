import { object, string } from "yup";

let inviteUserDefaultValues = {
  fullName: "vinay  ",
  email: "vinaykanna367@gmail.com",
  role: "85",
  mobileNumber: "9505335109",
};

let inviteUserSchema = () => {
  return object().shape({
    fullName: string().required("Full name is required"),
    email: string().email().required("Email is required"),
    role: string().required("Role is required"),
    mobileNumber: string()
      .matches(/^[0-9]{10}$/, "Mobile number is invalid")
      .required("Mobile number is required"),
  });
};

export { inviteUserDefaultValues, inviteUserSchema };
