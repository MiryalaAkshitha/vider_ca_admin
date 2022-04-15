import { Box, Typography } from "@mui/material";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import LoadingButton from "components/LoadingButton";
import FormRadioAddable from "components/FormFields/FormRadioAddable";
import { useState } from "react";

const Dropdown = (props) => {
  const { control, watch } = props;

  const dropdownComponent = { label: "", value: "" };
  const [dropdownComponents, setDropdownComponents] = useState([
    { label: "", value: "" },
  ]);

  const onAdd = () => {
    const newDropdownComponents = [...dropdownComponents, dropdownComponent];
    setDropdownComponents(newDropdownComponents);
  };

  const onDelete = (item, index) => {
    if (dropdownComponents.length > 1) {
      const newDropdownComponents = dropdownComponents.filter(
        (_, idx) => idx !== index
      );
      setDropdownComponents(newDropdownComponents);
    }
  };

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
          options={dropdownComponents}
          onAdd={onAdd}
          onDelete={onDelete}
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="selectionType"
          label="Selection Type"
          options={[
            { label: "Single", value: "single" },
            { label: "Multiple", value: "multiple" },
          ]}
        />
      </Box>
      {watch("selectionType") === "multiple" && (
        <Box mt={2} sx={{ display: "flex" }}>
          <Box mr={1}>
            <FormInput name="min" label="Min" control={control} />
          </Box>
          <Box mr={1}>
            <FormInput name="max" label="Max" control={control} />
          </Box>
        </Box>
      )}
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
