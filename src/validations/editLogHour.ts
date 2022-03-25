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

export { editLogHourDefaultValues, EditLogHourSchema };
