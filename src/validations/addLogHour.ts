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
var currentDate = new Date();

let AddLogHourSchema = ({ enterInHours, taskCreatedDate }) => {

  // Given date string
var givenDateStr = taskCreatedDate;

// Convert the given date string to a Date object
var givenDate = new Date(givenDateStr);

// Subtract one day
givenDate.setDate(givenDate.getDate() - 1);

// Format the resulting date
var year = givenDate.getFullYear();
var month = ('0' + (givenDate.getMonth() + 1)).slice(-2);
var day = ('0' + givenDate.getDate()).slice(-2);
var hours = ('0' + givenDate.getHours()).slice(-2);
var minutes = ('0' + givenDate.getMinutes()).slice(-2);
var seconds = ('0' + givenDate.getSeconds()).slice(-2);
var milliseconds = ('00' + givenDate.getMilliseconds()).slice(-3);

// Construct the resulting date string in the same format
var resultingDateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

// Display the resulting date
//console.log(resultingDateStr);




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
      .min(resultingDateStr, "Date should be greater than task Start date")
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
};

export { addLogHourDefaultValues, AddLogHourSchema };
