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
  startTime: null,
  endTime: null,
};

let AddLogHourSchema = ({ enterInHours, taskCreatedDate }) => {
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
    // hours: object()
    //   .shape({
    //     label: string().required(),
    //     value: string().required(),
    //   })
    //   .nullable(),
    // minutes: mixed().when("hours", {
    //   is: (hours: any) => hours && hours.value === "00",
    //   then: object()
    //     .shape({
    //       label: string().required(),
    //       value: mixed().notOneOf(["00"], "Minutes should not be 00"),
    //     })
    //     .nullable(),
    //   otherwise: object()
    //     .shape({
    //       label: string().required(),
    //       value: string().required(),
    //     })
    //     .nullable(),
    // }),
  });
};

export { addLogHourDefaultValues, AddLogHourSchema };
