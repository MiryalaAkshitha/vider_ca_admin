import { Box, Typography } from "@mui/material";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import LoadingButton from "components/LoadingButton";

const DecisionBox = (props) => {
  const { control } = props;
  return (
    <>
      <Box mt={2}>
        <FormInput name="feildName" label="Feild Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormInput
          name="fieldInstructions"
          label="Field Instructions"
          multiline
          control={control}
        />
      </Box>
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          name="intialStatus"
          label="Intial Status"
          options={[
            { label: "Checked", value: "checked" },
            { label: "Unchecked", value: "unchecked" },
          ]}
        />
      </Box>
      <Box>
        <Typography>State Display Message</Typography>
        <Box mt={1}>
          <FormInput
            label="When checked"
            name="whenChecked"
            control={control}
          />
        </Box>
        <Box mt={1}>
          <FormInput
            label="When Unchecked"
            name="whenC=Unchecked"
            control={control}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
        <LoadingButton
          loading={false}
          fullWidth
          type="submit"
          loadingColor="white"
          title="Create Field"
          color="secondary"
        />
      </Box>
    </>
  );
};

export default DecisionBox;
