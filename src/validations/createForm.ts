import { object, string } from "yup";

let createFormDefaultValues = {
  formType: "",
  formName: "",
  formDescription: ""
}

let CreateFormSchema = () =>
  object().shape({
    formType: string().required("Form Type name is required"),
    formName: string().required("Form Name is required").min(3, "Form Name should be atleast 3 characters"),
    formDescription: string().nullable().notRequired(),
  });

export {
  createFormDefaultValues,
  CreateFormSchema
}