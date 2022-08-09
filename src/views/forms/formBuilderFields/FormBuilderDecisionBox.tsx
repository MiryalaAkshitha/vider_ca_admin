import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
}

function DecisionBox(props: Props) {
  const { name, size = "medium", control, label = "" } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <FormControlLabel
              sx={{ width: "100%" }}
              control={
                <Checkbox
                  size={size}
                  checked={field.value ? field?.value : false}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                />
              }
              label={label}
            />
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

export default DecisionBox;
