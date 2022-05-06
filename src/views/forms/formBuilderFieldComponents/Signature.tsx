import { Box, TextField, Typography } from "@mui/material";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import { Controller } from "react-hook-form";
import FormBuilderUpload from "../formBuilderFields/FormBuilderUpload";

interface Props {
  item: any;
  control: any;
  watch: any;
  setValue: any;
}

const Singature = (props: Props) => {
  const { control, watch, setValue } = props;
  return (
    <>
      <Box>
        <FormInput name="label" label="Field Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormInput
          name="instructions"
          label="Field Instructions"
          multiline
          control={control}
        />
      </Box>
      <Box mt={2}>
        <FormCheckbox control={control} name="required" label="Mandatory" />
      </Box>
      <Box mt={2}>
        <FormBuilderUpload
          id="signatureDocument"
          name="signatureDocument"
          label="Upload Document"
          control={control}
          max={1}
          maxFileSize={{ type: "MB", size: 5 }}
          accepted={["application/pdf"]}
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          label="Select Page"
          name="selectPage"
          control={control}
          options={[
            { label: "All", value: "ALL" },
            { label: "First", value: "FIRST" },
            { label: "Last", value: "LAST" },
            { label: "Even", value: "EVEN" },
            { label: "Odd", value: "ODD" },
            { label: "Specify", value: "SPECIFY" },
          ]}
        />
      </Box>
      {watch("selectPage") === "SPECIFY" && (
        <Box mt={2}>
          <FormInput
            name="pageNumbers"
            label="Page Numbers"
            control={control}
          />
        </Box>
      )}
      <Box mt={2}>
        <FormSelect
          label="Singature Position"
          name="signaturePosition"
          control={control}
          options={[
            { label: "Top left", value: "Top-Left" },
            { label: "Top right", value: "Top-Right" },
            { label: "Top center", value: "Top-Center" },
            { label: "Bottom left", value: "Bottom-Left" },
            { label: "Bottom right", value: "Bottom-Right" },
            { label: "Bottom center", value: "Bottom-Center" },
            { label: "Middel center", value: "Middle-Center" },
            { label: "Middle left", value: "Middle-Left" },
            { label: "Middle right", value: "Middle-Right" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormCheckbox
          control={control}
          name="preview"
          label="Prevew required"
        />
      </Box>
      <Box mt={1}>
        <FormCheckbox
          control={control}
          name="coSign"
          label="Co-Sign required"
        />
      </Box>
      {watch("coSign") && (
        <Box mt={2}>
          <FormSelect
            onChange={(v) => {
              setValue(
                "signatureDetails",
                Array.from({ length: +v }).map((_, i) => ({
                  name: `name ${i + 1}`,
                  designation: `designation ${i + 1}`,
                }))
              );
            }}
            label="Number of signatures"
            name="noOfSignatures"
            control={control}
            options={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
              { label: "6", value: "6" },
            ]}
          />
        </Box>
      )}
      {watch("coSign") && watch("noOfSignatures") && (
        <Box mt={2}>
          <SignatureField
            name="signatureDetails"
            control={control}
            setValue={setValue}
          />
        </Box>
      )}
    </>
  );
};

const SignatureField = (props: any) => {
  const { control, name } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        error = error as any;
        return (
          <Box>
            {field.value?.map((item: any, index: number) => (
              <Box display="flex" gap={1} mb={2} key={index}>
                <Box>
                  <TextField
                    value={item?.name}
                    fullWidth
                    label="Enter name"
                    onChange={(e) => {
                      let value = [...field.value];
                      value[index].name = e.target.value;
                      field.onChange(value);
                    }}
                    size="small"
                  />
                  {error && error[index] && (
                    <Typography
                      variant="caption"
                      sx={{ pl: "2px", display: "block" }}
                      color="rgb(211, 47, 47)"
                    >
                      {error[index]?.name?.message}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <TextField
                    value={item?.designation}
                    fullWidth
                    onChange={(e) => {
                      let value = [...field.value];
                      value[index].designation = e.target.value;
                      field.onChange(value);
                    }}
                    label="Enter Designation"
                    size="small"
                  />
                  {error && error[index] && (
                    <Typography
                      variant="caption"
                      sx={{ pl: "2px", display: "block" }}
                      color="rgb(211, 47, 47)"
                    >
                      {error[index]?.designation?.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        );
      }}
    />
  );
};

export default Singature;
