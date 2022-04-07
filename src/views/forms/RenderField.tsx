import { useForm } from "react-hook-form";
import FormbuilderTextField from "./formBuilderFields/TextField";
import { FormBuilderFieldTypes } from "./renderFieldsComponent";

function RenderField({ item }: any) {
  const { control } = useForm({
    mode: "onChange",
    defaultValues: {
      Email: "",
    },
  });

  switch (item.fieldType) {
    case FormBuilderFieldTypes.EMAIL:
      return (
        <FormbuilderTextField
          control={control}
          name={item?.label}
          label={item?.label}
          placeholder={item?.placeholder}
        />
      );
    default:
      return <h1>Not matched</h1>;
  }
}

export default RenderField;
