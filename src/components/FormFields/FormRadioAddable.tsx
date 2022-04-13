import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  label?: string;
  name?: string;
  size?: "small" | "medium";
  control: any;
  options: any;
  row?: boolean;
  deleteIcon: any;
  addIcon: any;
}

function FormRadioAddable(props: Props) {
  const {
    name = "",
    size = "small",
    control,
    label = "",
    options,
    row = false,
    deleteIcon,
    addIcon,
  } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <FormControl size={size} fullWidth>
              <FormLabel id={name}>{label}</FormLabel>
              <RadioGroup
                row={row}
                aria-labelledby="demo-controlled-radio-buttons-group"
                {...field}
              >
                {["Option 1", "Option 2", "Option 3", "Option 4"].map(
                  (item, index) => (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "90%",
                          }}
                        >
                          <FormControlLabel
                            key={index}
                            value={item}
                            control={<Radio />}
                            label={item}
                          />
                          {deleteIcon}
                        </Box>
                        {addIcon}
                      </Box>
                    </>
                  )
                )}
              </RadioGroup>
            </FormControl>
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
    </>
  );
}

export default FormRadioAddable;
