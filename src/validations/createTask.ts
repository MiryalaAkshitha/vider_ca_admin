import moment from "moment";
import { array, date, mixed, object, ref, string } from "yup";

let createNonRecurringTaskDefaultValues = {
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
  feeAmount: "",
  description: "",
};

let CreateNonRecurringClientSchema = ({ subcategoriesExist }: any) =>
  object().shape({
    client: array()
      .of(
        object().nullable().shape({
          label: string().required(),
          value: string().required(),
        })
      )
      .min(1, "Select atleast one member"),
    category: string().nullable().required("Category is required"),
    subCategory: mixed().when("category", {
      is: (category: any) => subcategoriesExist(category),
      then: string().required("Sub Category is required"),
      otherwise: string().notRequired(),
    }),
    name: string()
      .required("Name is required")
      .min(3, "Name should be atleast 3 characters"),
    startDate: date()
      .nullable()
      .typeError("Invalid date")
      .min(
        moment().format("YYYY-MM-DD"),
        "Start date should be greater than today"
      )
      .notRequired(),
    dueDate: date()
      .nullable()
      .typeError("Invalid date")
      .min(ref("startDate"), "Due date should be later than start date.")
      .notRequired(),
    expectedCompletionDate: date()
      .nullable()
      .typeError("Invalid Error")
      .min(
        ref("startDate"),
        "Expected completed date should be later than start date."
      )
      .notRequired(),
    financialYear: string().required("Financial Year is required"),
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
    taskLeader: string().notRequired(),
    priority: string().nullable().notRequired(),
    feeAmount: string()
      .nullable()
      .notRequired()
      .matches(/^[0-9]*$/, `Fee amount must be a number`),
    description: string().nullable().notRequired(),
  });

export { createNonRecurringTaskDefaultValues, CreateNonRecurringClientSchema };
