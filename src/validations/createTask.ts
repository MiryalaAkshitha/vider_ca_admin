import moment from "moment";
import { RecurringFrequency } from "data/constants";
import { array, boolean, date, mixed, object, ref, string } from "yup";

let createTaskDefaultValues = {
  serviceType: "standard",
  taskType: "non_recurring",
  service: null,
  client: [],
  category: "",
  subCategory: "",
  name: "",
  startDate: null,
  dueDate: null,
  expectedCompletionDate: null,
  financialYear: "",
  labels: [],
  members: [],
  taskLeader: "",
  priority: "none",
  feeType: "TOTAL",
  feeAmount: "",
  description: "",
  frequency: "",
  customDates: [],
  recurringStartDate: null,
  dueDay: null,
  recurringEndDate: null,
  neverExpires: true,
};

let createTaskSchema = ({ subcategoriesExist }: any) =>
  object().shape({
    serviceType: string().required(),
    taskType: string().required(),
    service: mixed().nullable().when("serviceType", {
      is: "standard",
      then: object().nullable().required(),
      otherwise: object().nullable().notRequired(),
    }),
    client: array().min(1, "Select atleast one member"),
    category: mixed()
      .nullable()
      .when("serviceType", {
        is: (serviceType: any) => serviceType === "custom",
        then: string().required("Category is required"),
        otherwise: string().notRequired(),
      }),
    subCategory: mixed().when(["serviceType", "category"], {
      is: (serviceType: any, category: any) => {
        return serviceType === "custom" && subcategoriesExist(category);
      },
      then: string().required("Sub Category is required"),
      otherwise: string().notRequired(),
    }),
    name: mixed().when("serviceType", {
      is: (serviceType: any) => serviceType === "custom",
      then: string()
        .required("Name is required")
        .min(3, "Name should be atleast 3 characters"),
      otherwise: string().notRequired(),
    }),
    startDate: mixed().when("taskType", {
      is: (taskType: any) => taskType === "non_recurring",
      then: date()
        .nullable()
        .typeError("Invalid date")
        .required("Start date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    dueDate: mixed().when("taskType", {
      is: (taskType: any) => taskType === "non_recurring",
      then: date()
        .nullable()
        .typeError("Invalid date")
        .min(
          moment().format("YYYY-MM-DD"),
          "Due date should be greater than today"
        )
        .required("Due date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    expectedCompletionDate: date()
      .nullable()
      .typeError("Invalid Error")
      .min(
        moment().format("YYYY-MM-DD"),
        "Start date should be greater than today"
      )
      .notRequired(),
    financialYear: string().required("Financial Year is required"),
    members: array().notRequired(),
    labels: array().notRequired(),
    taskLeader: string().notRequired(),
    priority: string().nullable().notRequired(),
    feeType: string().required("Fee Type is required"),
    feeAmount: string().notRequired().nullable(),
    description: string().nullable().notRequired(),
    frequency: mixed().when("taskType", {
      is: (taskType: any) => taskType === "recurring",
      then: string().required("Frequency is required"),
      otherwise: string().notRequired(),
    }),
    customDates: mixed().when(["taskType", "frequency"], {
      is: (taskType: any, frequency: any) => {
        return (
          taskType === "recurring" && frequency === RecurringFrequency.CUSTOM
        );
      },
      then: array().required().min(1, "Select atleast one custom date"),
      otherwise: array().notRequired(),
    }),
    recurringStartDate: mixed().when(["taskType", "frequency"], {
      is: (taskType: any, frequency: any) => {
        return (
          taskType === "recurring" && frequency !== RecurringFrequency.CUSTOM
        );
      },
      then: date()
        .nullable()
        .typeError("Invalid date")
        .required("Recurring start date is required")
        .min(
          moment().format("YYYY-MM-DD"),
          "Start date should be greater than today"
        ),
      otherwise: date().nullable().notRequired(),
    }),
    dueDay: mixed().when(["taskType", "frequency"], {
      is: (taskType: any, frequency: any) => {
        return (
          taskType === "recurring" && frequency !== RecurringFrequency.CUSTOM
        );
      },
      then: object().nullable().required("Due Day input is required"),
      otherwise: object().nullable().notRequired(),
    }),
    recurringEndDate: date().nullable().notRequired(),
    neverExpires: mixed().when(["taskType", "frequency", "recurringEndDate"], {
      is: (taskType: any, frequency: any, recurringEndDate: any) => {
        return (
          taskType === "recurring" &&
          frequency !== RecurringFrequency.CUSTOM &&
          !recurringEndDate
        );
      },
      then: boolean()
        .isTrue("Never expires is required or select recurring end date")
        .required(),
      otherwise: boolean().notRequired(),
    }),
  });

export { createTaskDefaultValues, createTaskSchema };
