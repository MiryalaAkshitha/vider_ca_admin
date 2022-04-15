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
import FormInput from "./FormInput";

interface Props {
  label?: string;
  name?: string;
  size?: "small" | "medium";
  control: any;
  options: any;
  row?: boolean;
  onAdd: any;
  onDelete: any;
}

function FormRadioAddable(props: Props) {
  const {
    name = "",
    size = "small",
    control,
    label = "",
    options,
    row = false,
    onAdd,
    onDelete,
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
                {options.map((item, index) => (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "90%",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          <FormControlLabel
                            key={index}
                            value={item.label}
                            control={<Radio />}
                            label=""
                          />
                          <FormInput
                            control={control}
                            name="titleElement"
                            // onChange={(i, j) => console.log(i, j)}
                          />
                        </Box>
                        <Box>
                          <DeleteIcon onClick={() => onDelete(item, index)} />
                        </Box>
                      </Box>
                      <AddCircleIcon onClick={() => onAdd(item, index)} />
                    </Box>
                  </>
                ))}
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
