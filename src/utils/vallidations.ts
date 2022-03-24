import { string, date, object, array, mixed } from "yup";

let createClientDefaultValues = {
  displayName: "",
  tradeName: "",
  category: "",
  subCategory: "",
  clientManager: "",
  email: "",
  mobileNumber: "",
};

let addLogHourDefaultValues = {
  users: [],
  completedDate: new Date(),
  hours: "00",
  minutes: "00",
};

let CreateClientSchema = object().shape({
  displayName: string()
    .required("Display name is required")
    .min(3, "Display name should be atleast 3 characters")
    .max(12, "Display name should not exceed 12 characters"),
  tradeName: string()
    .required("Display name is required")
    .min(3, "Display name should be atleast 3 characters")
    .max(12, "Display name should not exceed 12 characters"),
  clientManager: string().required("Select a client manager"),
  category: string().required("Category is required"),
  subCategory: string().notRequired(),
  email: string().email("Invalid email address").required("Email is required"),
  mobileNumber: string()
    .required("Mobile number is required")
    .min(10, "Mobile number should be atleast 10 digits")
    .max(10, "Mobile number should not exceed 10 digits"),
});

let AddLogHourSchema = ({ taskCreatedDate }) => {
  return object().shape({
    users: array()
      .of(
        object().shape({
          label: string().required(),
          value: string().required(),
        })
      )
      .min(1, "Select atleast one user"),
    completedDate: date()
      .nullable()
      .required("Date is required")
      .min(taskCreatedDate, "Date should be greater than task created date")
      .max(new Date(), "Date should not be greater than today"),
    minutes: mixed().when("hours", {
      is: (hours: string) => hours === "00",
      then: string().test(
        "minutes",
        "Minutes should be greater than 00",
        (value) => value !== "00"
      ),
      otherwise: string().notRequired(),
    }),
  });
};

export {
  createClientDefaultValues,
  CreateClientSchema,
  AddLogHourSchema,
  addLogHourDefaultValues,
};
