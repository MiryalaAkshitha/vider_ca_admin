import { Close } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import FormRadio from "components/FormFields/FormRadio";
import { useState } from "react";
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
      {watch("service") && (
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
          <Typography variant="subtitle2">{watch("service")?.name}</Typography>
          <IconButton onClick={() => setValue("service", null)} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Box>
      )}
      {!watch("service") && watch("serviceType") === "standard" && (
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
      )}
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          label="Task Type"
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
      <SelectService open={open} setOpen={setOpen} setValue={setValue} />
    </>
  );
}

export default SelectTypes;
