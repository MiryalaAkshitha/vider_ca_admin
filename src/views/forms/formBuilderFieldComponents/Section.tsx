import { Box } from "@mui/material";
import FormInput from "components/FormFields/FormInput";

const Section = (props: any) => {
  const { control } = props;
  return (
    <>
      <Box mt={2}>
        <FormInput name="label" label="Section Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormInput
          multiline
          name="description"
          label="Description"
          control={control}
        />
      </Box>
    </>
  );
};

export default Section;
