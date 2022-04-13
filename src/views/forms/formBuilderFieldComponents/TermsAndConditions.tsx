import { Box, Typography } from "@mui/material";
import FormEditor from "components/FormFields/FormEditor";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import LoadingButton from "components/LoadingButton";

const TermsAndConditions = (props) => {
  const { control } = props;
  return (
    <>
      <Box mt={2}>
        <FormInput name="feildName" label="Feild Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormEditor
          id={"termsAndConditions"}
          control={control}
          label="Terms and Conditions"
          name="termsAndConditions"
        />
      </Box>
      <Box mt={2}>
        <FormInput control={control} name="declaration" label="Declaration" />
      </Box>
      <Typography variant="caption">
        Ex : I accept the Terms and Conditions
      </Typography>
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          name="fieldType"
          label="Field Type"
          options={[
            { label: "Mandatory", value: "mandatory" },
            { label: "Non Madatory", value: "non mandatory" },
          ]}
        />
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

export default TermsAndConditions;
