import moment from "moment";
import { array, date, mixed, object, string } from "yup";

const currentYear = new Date().getFullYear();
const currentFinancialYear = currentYear + "-" + (currentYear + 1);

let createTaskDefaultValues = {
  serviceType: "standard",
  taskType: "non_recurring",
  service: null,
  approvalHierarchy: null,
  client: [],
  category: "",
  subCategory: "",
  name: "",
  startDate: null,
  dueDate: null,
  expectedCompletionDate: null,
  financialYear: currentFinancialYear,
  labels: [],
  members: [],
  taskLeader: null,
  priority: "none",
  feeType: "TOTAL",
  feeAmount: "",
  description: "",
  frequency: "",
  dates: [],
};

let createTaskSchema = ({ subcategoriesExist }: any) =>
  object().shape({
    serviceType: string().required(),
    taskType: string().required(),
    service: mixed()
      .nullable()
      .when("serviceType", {
        is: "standard",
        then: object().nullable().required("Please select service"),
        otherwise: object().nullable().notRequired(),
      }),
    client: array().min(1, "Select atleast one client"),
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
      then: string().required("Name is required").min(3, "Name should be atleast 3 characters"),
      otherwise: string().notRequired(),
    }),
    startDate: mixed().when("taskType", {
      is: (taskType: any) => taskType === "non_recurring",
      then: date().nullable().typeError("Invalid date").required("Start date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    dueDate: mixed().when("taskType", {
      is: (taskType: any) => taskType === "non_recurring",
      then: date().nullable().typeError("Invalid date").required("Due date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    expectedCompletionDate: date()
      .nullable()
      .typeError("Invalid Error")
      .min(moment().format("YYYY-MM-DD"), "Start date should be greater than today")
      .notRequired(),
    financialYear: string().required("Financial Year is required"),
    members: array().min(1, "Select atleast one member"),
    labels: array().notRequired(),
    taskLeader: object().nullable().notRequired(),
    priority: string().nullable().notRequired(),
    feeType: string().required("Fee Type is required"),
    feeAmount: string().nullable().notRequired(),
    description: string().nullable().notRequired(),
    frequency: mixed().when("taskType", {
      is: (taskType: any) => taskType === "recurring",
      then: string().required("Frequency is required"),
      otherwise: string().notRequired(),
    }),
    dates: array()
      .of(
        object().shape({
          startDate: string().required(),
          dueDate: string().required(),
        })
      )
      .when("taskType", {
        is: (taskType: any) => taskType === "recurring",
        then: (schema) => schema.required().min(1),
        otherwise: array().notRequired(),
      }),
  });

export { createTaskDefaultValues, createTaskSchema };
