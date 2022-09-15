import { Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import FormRadio from "components/FormFields/FormRadio";
import { useState } from "react";
import { Controller } from "react-hook-form";
import SelectService from "./SelectService";

function SelectTypes({ control, setValue, watch }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box>
        <FormRadio
          row
          control={control}
          label="Service Type"
          required={true}
          name="serviceType"
          options={[
            {
              label: "Custom",
              value: "custom",
            },
            {
              label: "Standard",
              value: "standard",
            },
          ]}
        />
      </Box>
      {watch("serviceType") === "standard" && (
        <Controller
          control={control}
          name="service"
          render={({ field, fieldState: { error } }) => {
            if (field.value) {
              return (
                <Box
                  sx={{
                    border: "1px solid rgba(0,0,0,0.4)",
                    borderRadius: 1,
                    px: 1,
                    py: "4px",
                    mt: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2">
                    {field?.value?.name} - {field?.value?.name}
                  </Typography>
                  <IconButton onClick={() => setOpen(true)} size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                </Box>
              );
            }
            return (
              <>
                <Box
                  mt={1}
                  onClick={() => setOpen(true)}
                  sx={{
                    border: "1px dashed rgba(0,0,0,0.3)",
                    borderRadius: 1,
                    p: 2,
                    height: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body1" color="rgba(0,0,0,0.5)">
                    Select Service
                  </Typography>
                </Box>
                {error && (
                  <Typography variant="caption" color="red">
                    {error.message}
                  </Typography>
                )}
              </>
            );
          }}
        />
      )}
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          label="Task Type"
          required={true}
          name="taskType"
          options={[
            {
              label: "Non Recurring",
              value: "non_recurring",
            },
            {
              label: "Recurring",
              value: "recurring",
            },
          ]}
        />
      </Box>
      <SelectService open={open} setOpen={setOpen} setValue={setValue} watch={watch} />
    </>
  );
}

export default SelectTypes;
