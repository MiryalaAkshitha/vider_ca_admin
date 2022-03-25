import { array, date, mixed, object, string } from "yup";

let addLogHourDefaultValues = {
  users: [],
  completedDate: new Date(),
  hours: {
    label: "00",
    value: "00",
  },
  minutes: {
    label: "00",
    value: "00",
  },
};

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
      .typeError("Invalid date")
      .required("Date is required")
      .min(taskCreatedDate, "Date should be greater than task created date")
      .max(new Date(), "Date should not be greater than today"),
    hours: object()
      .shape({
        label: string().required(),
        value: string().required(),
      })
      .nullable(),
    minutes: mixed().when("hours", {
      is: (hours: any) => hours && hours.value === "00",
      then: object()
        .shape({
          label: string().required(),
          value: mixed().notOneOf(["00"], "Minutes should not be 00"),
        })
        .nullable(),
      otherwise: object()
        .shape({
          label: string().required(),
          value: string().required(),
        })
        .nullable(),
    }),
  });
};

export { addLogHourDefaultValues, AddLogHourSchema };
