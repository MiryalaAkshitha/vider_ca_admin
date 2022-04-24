import moment from "moment";
import { RecurringFrequency } from "utils/constants";
import { array, boolean, date, mixed, object, string } from "yup";

let createRecurringTaskDefaultValues = {
  client: [],
  category: "",
  subCategory: "",
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
  priority: "none",
  feeAmount: "",
  description: "",
};

let createRecurringTaskSchema = ({ subCategoriesExist }) =>
  object().shape({
    client: array()
      .of(
        object().nullable().shape({
          label: string().required(),
          value: string().required(),
        })
      )
      .min(1, "Select atleast one client"),
    category: string().required("Category is required"),
    subCategory: mixed().when("category", {
      is: (category: any) => subCategoriesExist(category),
      then: string().required("Sub category is required"),
      otherwise: string().nullable().notRequired(),
    }),
    name: string()
      .required("Name is required")
      .min(3, "Name should be atleast 3 characters"),
    financialYear: string().required("Financial Year is required"),
    frequency: string().required("Frequency is required"),
    customDates: mixed().when("frequency", {
      is: (frequency: any) => frequency === RecurringFrequency.CUSTOM,
      then: array().required().min(1, "Select atleast one custom date"),
      otherwise: array().notRequired(),
    }),
    dueDay: mixed().when("frequency", {
      is: (frequency: any) => frequency !== RecurringFrequency.CUSTOM,
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
      is: (frequency: any) => frequency !== RecurringFrequency.CUSTOM,
      then: date()
        .nullable()
        .typeError("Invalid date")
        .required()
        .min(
          moment().format("YYYY-MM-DD"),
          "Start date should be greater than today"
        ),
      otherwise: date().nullable().notRequired(),
    }),
    neverExpires: mixed().when(["frequency", "recurringEndDate"], {
      is: (frequency: any, recurringEndDate: any) => {
        console.log(frequency, recurringEndDate);
        return frequency !== RecurringFrequency.CUSTOM && !recurringEndDate;
      },
      then: boolean()
        .isTrue("Never expires is required or select recurring end date")
        .required(),
      otherwise: boolean().notRequired(),
    }),
    recurringEndDate: date().nullable().notRequired(),
    members: array()
      .of(
        object().nullable().shape({
          label: string().notRequired(),
          value: string().notRequired(),
        })
      )
      .notRequired(),
    labels: array()
      .of(
        object().nullable().shape({
          label: string().notRequired(),
          value: string().notRequired(),
        })
      )
      .notRequired(),
    taskLeader: string().nullable().notRequired(),
    priority: string().nullable().notRequired(),
    feeAmount: string()
      .nullable()
      .notRequired()
      .matches(/^[0-9]*$/, `Fee amount must be a number`),
    description: string().nullable().notRequired(),
  });

export { createRecurringTaskDefaultValues, createRecurringTaskSchema };
