import { Add } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: any;
}

function FormOptions(props: Props) {
  const { name, control, label = "" } = props;

  return (
    <>
      <Typography color="rgba(0,0,0,0.6)" variant="body2" sx={{ mb: "8px" }}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            {field?.value?.length ? (
              field?.value?.map((item: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      // error={Boolean(error)}
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={item.label}
                      onChange={(e) => {
                        const newValue = [...field.value];
                        newValue[index].label = e.target.value;
                        newValue[index].value = e.target.value;
                        field.onChange(newValue);
                      }}
                    />
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => {
                        let values = field.value || [];
                        values.splice(index, 1);
                        field.onChange(values);
                      }}
                    >
                      <DeleteIcon color="secondary" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        let values = field.value || [];
                        values.splice(index + 1, 0, {
                          label: `Option ${index + 1 + 1}`,
                          value: `Option ${index + 1 + 1}`,
                        });
                        field.onChange(values);
                      }}
                    >
                      <AddCircleIcon color="primary" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            ) : (
              <Button
                onClick={() => {
                  field.onChange([
                    {
                      label: `Option 1`,
                      value: `Option 1`,
                    },
                  ]);
                }}
                sx={{ mt: "5px" }}
                size="small"
                variant="outlined"
                startIcon={<Add />}
              >
                Add option
              </Button>
            )}
            {error && (
              <Typography
                variant="caption"
                sx={{ pl: "2px", display: "block", mt: 1 }}
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

export default FormOptions;
