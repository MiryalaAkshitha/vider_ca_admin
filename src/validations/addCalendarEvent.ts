import moment from "moment";
import { array, boolean, date, mixed, object, ref, string } from "yup";

let addCalendarEventDefaultValues: any = {
  type: "EVENT",
  client: null,
  task: null,
  title: "",
  location: "",
  date: null,
  startTime: null,
  endTime: null,
  reminderCheck: false,
  reminder: "",
  notes: "",
  members: [],
};

let AddCalendarEventSchema = () => {
  return object()
    .nullable()
    .shape({
      type: string().required(),
      client: object()
        .nullable()
        .when("type", {
          is: "TASK",
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

      members: array().when("type", {
        is: "TASK",
        then: (schema) => schema.min(1, "Select atleast one member"),
        otherwise: (schema) => schema.notRequired(),
      }),
      title: string()
        .required("Event name is required")
        .min(3, "Event name should be atleast 3 characters"),
      location: string().notRequired(),
      date: date()
        .nullable()
        .typeError("Invalid date")
        .required("Date is required")
        .min(
          moment().format("YYYY-MM-DD"),
          "Date should be greater than today"
        ),
      startTime: date()
        .nullable()
        .typeError("Invalid start time")
        .notRequired(),
      endTime: date()
        .nullable()
        .min(ref("startTime"), "End time should be greater than start time")
        .typeError("Invalid end time")
        .notRequired(),
      notes: string().notRequired(),
      reminderCheck: boolean().notRequired(),
      reminder: mixed().when("reminderCheck", {
        is: (reminderCheck: boolean) => reminderCheck,
        then: string().required("Reminder is required"),
        otherwise: string().notRequired(),
      }),
    });
};

export { addCalendarEventDefaultValues, AddCalendarEventSchema };
