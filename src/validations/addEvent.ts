import { ref } from "yup";
import { string, date, object, array, mixed, boolean } from "yup";

let linkEventDefaultValues = {
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

let LinkEventSchema = ({ taskCreatedDate }) => {
  return object().shape({
    members: array()
      .of(
        object().shape({
          label: string().required(),
          value: string().required(),
        })
      )
      .min(1, "Select atleast one member"),
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

export { linkEventDefaultValues, LinkEventSchema };
