import { Box, Typography } from "@mui/material";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";

const DecisionBox = (props) => {
  const { control } = props;
  return (
    <>
      <Box mt={2}>
        <FormInput name="label" label="Field Name" control={control} />
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color="rgba(0,0,0,0.7)">
          Initial status
        </Typography>
        <FormCheckbox control={control} name="defaultValue" label="Checked" />
      </Box>
      <Box mt={2}>
        <Typography mb="10px" variant="body2" color="rgba(0,0,0,0.7)">
          State Display Message
        </Typography>
        <Box>
          <FormInput
            label="When checked"
            name="checkedText"
            control={control}
          />
        </Box>
        <Box mt={2}>
          <FormInput
            label="When Unchecked"
            name="uncheckedText"
            control={control}
          />
        </Box>
      </Box>
    </>
  );
};

export default DecisionBox;
