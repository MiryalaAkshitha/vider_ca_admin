import { Box } from "@mui/material";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";

function CustomCommonFields({ control, watch, categories }) {
  let subCategories = categories?.data.find(
    (item: any) => item.id === watch("category")
  )?.subCategories;

  return (
    <>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="category"
          label="Category"
          options={categories?.data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))}
        />
      </Box>
      {subCategories?.length > 0 && (
        <Box mt={2}>
          <FormSelect
            control={control}
            name="subCategory"
            label="Sub Category"
            options={subCategories.map((item: any) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Box>
      )}
      <Box mt={2}>
        <FormInput name="name" control={control} label="Name" />
      </Box>
    </>
  );
}

export default CustomCommonFields;
