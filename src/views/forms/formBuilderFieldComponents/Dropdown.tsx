import { Box, Typography } from "@mui/material";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import LoadingButton from "components/LoadingButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import FormRadioAddable from "components/FormFields/FormRadioAddable";

const Dropdown = (props) => {
  const { control } = props;
  return (
    <>
      <Box mt={2}>
        <FormInput name="feildName" label="Feild Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormInput
          name="feildInstructions"
          label="Feild Instructions"
          control={control}
        />
      </Box>
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          name="fieldSize"
          label="Field Size"
          options={[
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormInput
          name="placeHolderText"
          label="PlaceHolder Text"
          control={control}
        />
      </Box>
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
      <Box mt={2}>
        <Typography>Dropdown Components</Typography>
        <FormRadioAddable
          control={control}
          options={["Option 1", "Option 2", "Option 3", "Option 4"]}
          deleteIcon={<DeleteIcon />}
          addIcon={<AddCircleIcon />}
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="selectionType"
          label="Selection Type"
          options={[
            { label: "Single", value: "single" },
            { label: "Multiple", value: "mulitiple" },
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

export default Dropdown;
