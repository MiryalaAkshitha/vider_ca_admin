import { matches } from "lodash";
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
    email: string().email().required("Email is required"),
    role: string().required("Role is required"),
    mobileNumber: string()
      .matches(/^[0-9]{10}$/, "Mobile number is invalid")
      .required("Mobile number is required"),
    // TODO: pass should be required
    password: string().notRequired(),
  });
};

export { inviteUserDefaultValues, inviteUserSchema };
