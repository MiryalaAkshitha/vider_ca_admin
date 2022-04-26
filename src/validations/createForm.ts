import { array, object, string } from "yup";

let createFormDefaultValues = {
  name: "",
  description: "",
  tags: [],
};

let CreateFormSchema = () =>
  object().shape({
    name: string()
      .required("Form Name is required")
      .min(3, "Form Name should be atleast 3 characters"),
    description: string().nullable().notRequired(),
    tags: array(string()).notRequired(),
  });

export { createFormDefaultValues, CreateFormSchema };
