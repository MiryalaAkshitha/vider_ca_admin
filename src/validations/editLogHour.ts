import { date, mixed, object, string } from "yup";

let editLogHourDefaultValues = {
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

let EditLogHourSchema = ({ taskCreatedDate }) => {
  return object().shape({
    completedDate: date()
      .nullable()
      .typeError("Invalid date")
      .required("Date is required")
      .min(taskCreatedDate, "Date should be greater than task created date")
      .max(new Date(), "Date should not be greater than today"),
    minutes: object().shape({
      label: string().required(),
      value: mixed().when("hours", {
        is: (hours: string) => hours === "00",
        then: string().test(
          "minutes",
          "Minutes should be greater than 00",
          (value) => value !== "00"
        ),
        otherwise: string().notRequired(),
      }),
    }),
  });
};

export { editLogHourDefaultValues, EditLogHourSchema };
