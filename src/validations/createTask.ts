import { object, date, string, boolean, array, mixed } from "yup";
import { RecurringFrequency } from "utils/constants";

let createRecurringTaskDefaultValues = {
  client: [],
  category: "",
  name: "",
  frequency: "",
  customDates: [],
  recurringStartDate: null,
  dueDay: null,
  recurringEndDate: null,
  neverExpires: true,
  financialYear: "",
  labels: [],
  members: [],
  taskLeader: "",
  priority: null,
  feeAmount: "",
  description: "",
};

let CreateRecurringClientSchema = ({ taskCreatedDate }) =>
  object().shape({
    client: array()
      .of(
        object().nullable().shape({
          label: string().required(),
          value: string().required(),
        })
      )
      .min(1, "Select atleast one member"),
    category: string().required("Category name is required"),
    name: string()
      .required("Display name is required")
      .min(3, "Display name should be atleast 3 characters")
      .max(12, "Display name should not exceed 12 characters"),
    financialYear: string().required("Financial Year is required"),
    frequency: string().required("Frequency is required"),
    customDates: array()
      .of(
        object().nullable().shape({
          startDate: string().notRequired(),
          dueDate: string().notRequired(),
        })
      )
      .notRequired(),
    dueDay: mixed().when("frequency", {
      is: (frequency) => frequency !== `${RecurringFrequency.CUSTOM}`,
      then: object()
        .nullable()
        .shape({
          label: string().required(),
          value: string().required(),
        })
        .required("Due Day input is required"),
      otherwise: object().nullable().notRequired(),
    }),
    recurringStartDate: mixed().when("frequency", {
      is: (frequency) => frequency !== `${RecurringFrequency.CUSTOM}`,
      then: date()
        .nullable()
        .typeError("Invalid date")
        .required("Recurring Start Date is required")
        .min(
          taskCreatedDate,
          "Recurring Start Date should be greater than task created date"
        ),
      otherwise: date().nullable().notRequired(),
    }),
    neverExpires: boolean().required(
      "Never Expires input is required or Select Recurring End Date"
    ),
    recurringEndDate: mixed().when("neverExpires", {
      is: (neverExpires) => !neverExpires,
      then: date()
        .nullable()
        .typeError("Invalid Error")
        .min(
          taskCreatedDate,
          "Start Date should be greater than task created date"
        )
        .required("Recurring End Date is required"),
      otherwise: date().nullable().notRequired(),
    }),
  });

let createNonRecurringTaskDefaultValues = {
  client: [],
  category: "",
  name: "",
  startDate: null,
  dueDate: null,
  expectedCompletionDate: null,
  financialYear: "",
  labels: [],
  members: [],
  taskLeader: "",
  priority: null,
  feeAmount: "",
  description: "",
};

let CreateNonRecurringClientSchema = object().shape({
  client: array()
    .of(
      object().nullable().shape({
        label: string().required(),
        value: string().required(),
      })
    )
    .min(1, "Select atleast one member"),
  category: string().required("Category name is required"),
  name: string()
    .required("Display name is required")
    .min(3, "Display name should be atleast 3 characters")
    .max(12, "Display name should not exceed 12 characters"),
  startDate: date().nullable().typeError("Invalid Error").notRequired(),
  financialYear: string().required("Financial Year is required"),
});

export {
  createRecurringTaskDefaultValues,
  CreateRecurringClientSchema,
  createNonRecurringTaskDefaultValues,
  CreateNonRecurringClientSchema,
};
