import { object, string } from "yup";

let addUserExpenditureDefaultValues = {
  type: "GENERAL",
  particularName: "",
  amount: "",
  client: null,
  task: null,
  taskExpenseType: "",
  attachment: null,
};

let AddUserExpenditureSchema = object().shape({
  type: string().required(),
  particularName: string().required("Particular name is required"),
  amount: string().required("Amount is required"),
  client: object().nullable().required("Client is required"),
  task: object()
    .nullable()
    .when("type", {
      is: "TASK",
      then: (schema) => schema.required("Task is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  taskExpenseType: string().when("type", {
    is: "TASK",
    then: (schema) => schema.required("Task Expense Type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  attachment: string().nullable().notRequired(),
});

export { addUserExpenditureDefaultValues, AddUserExpenditureSchema };
