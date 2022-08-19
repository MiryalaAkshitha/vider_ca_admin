import { Close, Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { getTitle } from "utils";
import RecurringFrequencyDetails from "./RecurringFrequencyDetails";
import { StyledSelectBox, StyledSelectedBox } from "./styles";

const RecurringFields = ({ control, watch, setValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box mt={2}>
        <Typography color="rgba(0, 0, 0, 0.54)" variant="caption">
          Recurring Frequency Details
        </Typography>
        {watch("frequency") ? (
          <StyledSelectedBox sx={{ mt: "4px" }}>
            <Box display="flex" gap={1} alignItems="center">
              <Typography variant="subtitle2">
                {watch("financialYear")} - {getTitle(watch("frequency"))}
              </Typography>
            </Box>
            <IconButton onClick={() => setOpen(true)} size="small">
              <Edit fontSize="small" />
            </IconButton>
          </StyledSelectedBox>
        ) : (
          <StyledSelectBox sx={{ mt: "4px" }} onClick={() => setOpen(true)}>
            <Typography variant="body1" color="rgba(0,0,0,0.5)">
              + Add Recurring Frequency
            </Typography>
          </StyledSelectBox>
        )}
      </Box>
      <RecurringFrequencyDetails
        open={open}
        setOpen={setOpen}
        control={control}
        watch={watch}
        setValue={setValue}
      />
    </>
  );
};

export default RecurringFields;
