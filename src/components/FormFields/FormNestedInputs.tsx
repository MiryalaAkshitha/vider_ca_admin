import { Visibility } from "@mui/icons-material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Controller } from "react-hook-form";
import { reorder } from "views/tasks/board/utils";

const FormNestedInputs = ({ control, name, label }: any) => {
  const handleChange = (field: any, index: number, key: string, value: any) => {
    let newInputs = [...field.value];
    newInputs[index][key] = value;

    field.onChange(newInputs);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DragDropContext
          onDragEnd={(result) => {
            const { source, destination } = result;

            if (!destination) return;

            if (source.droppableId !== destination.droppableId) return;

            if (source.index === destination.index) return;

            let newData = reorder(
              field?.value,
              source.index,
              destination.index
            );
            field.onChange(newData);
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body2">{label}</Typography>
            <Typography variant="body2">Mandatory</Typography>
          </Box>
          <Droppable droppableId="droppable">
            {(provided: any) => (
              <Box
                ref={(ref) => {
                  provided.innerRef(ref);
                }}
              >
                {field?.value?.map((input: any, index: number) => (
                  <Draggable
                    key={input?._id}
                    draggableId={input?._id}
                    index={index}
                  >
                    {(provided: any) => (
                      <Box
                        mb={3}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 5,
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Box display="flex" flex={1} alignItems="center">
                          <Box
                            sx={{
                              background: "rgba(0,0,0,0.2)",
                              height: "100%",
                              borderTopLeftRadius: 4,
                              borderBottomLeftRadius: 4,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <DragIndicatorIcon />
                          </Box>
                          <Box flex={1}>
                            <TextField
                              onChange={(e) =>
                                handleChange(
                                  field,
                                  index,
                                  "label",
                                  e.target.value
                                )
                              }
                              InputProps={{
                                sx: {
                                  border: "none",
                                },
                              }}
                              value={input?.label}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "rgba(0, 0, 0, 0.23)",
                                    borderWidth: 1,
                                    borderStyle: "solid",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "rgba(0, 0, 0, 0.23)",
                                    borderWidth: 1,
                                    borderStyle: "solid",
                                  },
                                },
                              }}
                              size="small"
                              fullWidth
                            />
                          </Box>
                        </Box>
                        <Box display="flex" gap={1} alignItems="center">
                          <IconButton>
                            {input.hide ? (
                              <VisibilityOffIcon
                                onClick={() => {
                                  handleChange(field, index, "hide", false);
                                }}
                              />
                            ) : (
                              <Visibility
                                onClick={() => {
                                  handleChange(field, index, "hide", true);
                                }}
                              />
                            )}
                          </IconButton>
                          <Checkbox
                            name="mandatoryCheck"
                            onChange={(e) => {
                              handleChange(
                                field,
                                index,
                                "required",
                                e.target.checked
                              );
                            }}
                            checked={input.required}
                            sx={{ width: "auto", m: 0, p: 0 }}
                          />
                        </Box>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}
    />
  );
};

export default FormNestedInputs;
