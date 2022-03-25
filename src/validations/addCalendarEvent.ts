import { boolean, date, mixed, object, ref, string } from "yup";

let addCalendarEventDefaultValues = {
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
};

let AddCalendarEventSchema = ({ taskCreatedDate }) => {
  return object()
    .nullable()
    .shape({
      client: object().shape({
        label: string().required(),
        value: string().required(),
      }),
      task: object().nullable().shape({
        label: string().required(),
        value: string().required(),
      }),
      title: string()
        .required("Event name is required")
        .min(3, "Event name should be atleast 3 characters"),
      location: string().required("Location is required"),
      date: date()
        .nullable()
        .typeError("Invalid date")
        .required("Date is required")
        .min(taskCreatedDate, "Date should be greater than task created date"),
      startTime: date()
        .nullable()
        .typeError("Invalid start time")
        .required("Start time is required"),
      endTime: date()
        .nullable()
        .min(ref("startTime"), "End time should be greater than start time")
        .typeError("Invalid end time")
        .required("End time is required"),
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
