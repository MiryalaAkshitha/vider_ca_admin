import { date, mixed, object, string } from "yup";

let addUserLogHourDefaultValues = {
  type: "GENERAL",
  title: "",
  description: "",
  client: null,
  task: null,
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

let AddUserLogHourSchema = object().shape({
  type: string(),
  title: mixed().when("type", {
    is: "GENERAL",
    then: string().required("Title is required"),
    otherwise: string().notRequired(),
  }),
  client: object()
    .nullable()
    .when("type", {
      is: "GENERAL",
      then: (schema) => schema.required("Client is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  task: object()
    .nullable()
    .when("type", {
      is: "TASK",
      then: (schema) => schema.required("Task is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  completedDate: date()
    .nullable()
    .typeError("Invalid date")
    .required("Date is required")
    .max(new Date(), "Date should not be greater than today"),
  hours: object()
    .shape({
      label: string().required(),
      value: string().required(),
    })
    .nullable()
    .required("Hours is required"),
  minutes: object()
    .required("Minutes is required")
    .nullable()
    .when("hours", {
      is: (hours: any) => hours && hours.value === "00",
      then: (schema) => {
        return schema.shape({
          label: string().required(),
          value: mixed().notOneOf(["00"], "Minutes should not be 00"),
        });
      },
      otherwise: (schema) => {
        return schema.shape({
          label: string().required(),
          value: string().required(),
        });
      },
    }),
});

export { addUserLogHourDefaultValues, AddUserLogHourSchema };