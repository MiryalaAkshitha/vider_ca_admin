import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import DialogWrapper from "components/DialogWrapper";
import { useState } from "react";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  termsAndConditions?: string;
}

function FormBuilderTermsAndConditions(props: Props) {
  const {
    name,
    size = "medium",
    control,
    label = "",
    termsAndConditions = "",
  } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Box>
              <FormControlLabel
                sx={{ width: "100%" }}
                control={
                  <Checkbox
                    size={size}
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography variant="body2">{label}</Typography>
                    <IconButton size="small" onClick={() => setOpen(true)}>
                      <OpenInNewRoundedIcon
                        sx={{ color: "rgb(25, 118, 210)", fontSize: "17px" }}
                      />
                    </IconButton>
                  </Box>
                }
              />
            </Box>
            {error && (
              <Typography
                variant="caption"
                sx={{ pl: "2px" }}
                color="rgb(211, 47, 47)"
              >
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
      <DialogWrapper width="md" open={open} setOpen={setOpen} title="">
        <Box
          sx={{
            fontFamily: "muli_regular",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: termsAndConditions,
            }}
          ></div>
        </Box>
      </DialogWrapper>
    </>
  );
}

export default FormBuilderTermsAndConditions;
