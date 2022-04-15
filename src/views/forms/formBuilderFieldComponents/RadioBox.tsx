import { Box, Typography } from "@mui/material";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import LoadingButton from "components/LoadingButton";
import FormRadioAddable from "components/FormFields/FormRadioAddable";
import { useState } from "react";

const RadioBox = (props) => {
  const { control } = props;

  const radioBoxComponent = { label: "", value: "" };
  const [radioBoxComponents, setRadioBoxComponents] = useState([
    { label: "", value: "" },
  ]);

  const onAdd = () => {
    const newRadioBoxComponents = [...radioBoxComponents, radioBoxComponent];
    setRadioBoxComponents(newRadioBoxComponents);
  };

  const onDelete = (item, index) => {
    if (radioBoxComponents.length > 1) {
      const newRadioBoxComponents = radioBoxComponents.filter(
        (_, idx) => idx !== index
      );
      setRadioBoxComponents(newRadioBoxComponents);
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
        <Typography>RadioBox Components</Typography>
        <FormRadioAddable
          control={control}
          options={radioBoxComponents}
          onAdd={onAdd}
          onDelete={onDelete}
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

export default RadioBox;
