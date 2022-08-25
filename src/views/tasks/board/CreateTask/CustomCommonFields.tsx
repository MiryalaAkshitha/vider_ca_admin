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
          required
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
            required
            label="Sub Category"
            options={subCategories.map((item: any) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Box>
      )}
      <Box mt={2}>
        <FormInput required name="Name" control={control} label="Service Name/ Task Name" />
      </Box>
    </>
  );
}

export default CustomCommonFields;
