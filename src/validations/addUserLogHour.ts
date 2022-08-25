import { boolean, date, mixed, object, string } from "yup";

let addUserLogHourDefaultValues = {
  logHourType: "GENERAL",
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
  startTime: null,
  endTime: null,
};

let AddUserLogHourSchema = ({ enterInHours }) =>
  object().shape({
    logHourType: string(),
    title: string().when("logHourType", {
      is: "GENERAL",
      then: (schema) => schema.required("Title is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    client: object().nullable().required("Client is required"),
    task: object()
      .nullable()
      .when("logHourType", {
        is: "TASK",
        then: (schema) => schema.required("Task is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    completedDate: date()
      .nullable()
      .typeError("Invalid date")
      .required("Date is required")
      .max(new Date(), "Date should not be greater than today"),
    ...(enterInHours && {
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
    }),
    ...(!enterInHours && {
      startTime: string().required("Start Time is required").nullable(),
      endTime: string().required("End Time is required").nullable(),
    }),
  });

export { addUserLogHourDefaultValues, AddUserLogHourSchema };
