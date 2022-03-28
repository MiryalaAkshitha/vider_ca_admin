import { object, string } from "yup";

let inviteUserDefaultValues = {
  fullName: "",
  email: "",
  role: "",
  mobileNumber: "",
};

let inviteUserSchema = () => {
  return object().shape({
    fullName: string().required("Full name is required"),
    email: string().required("Email is required"),
    role: string().required("Role is required"),
    mobileNumber: string().required("Mobile number is required"),
  });
};

export { inviteUserDefaultValues, inviteUserSchema };
