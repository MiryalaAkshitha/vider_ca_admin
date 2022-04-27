import Add from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Button, Divider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddTermsAndConditions,
  handleRemoveTermsAndConditions,
  handleUpdateTermsAndConditions,
  selectInvoice,
} from "redux/reducers/createInvoiceSlice";

const DraggableListItems = () => {
  const dispatch = useDispatch();
  const { termsAndConditions } = useSelector(selectInvoice);
  const [term, setTerm] = useState("");

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(termsAndConditions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(handleUpdateTermsAndConditions(items));
  }

  function handleAddTerm() {
    if (term !== "") {
      dispatch(handleAddTermsAndConditions(term));
      setTerm("");
    }
  }

  function handleRemoveTerm(index) {
    dispatch(handleRemoveTermsAndConditions(index));
  }

  return (
    <Box sx={{ padding: "20px 0" }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="terms">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {termsAndConditions.map((term, index) => {
                return (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Box
                          sx={{
                            padding: "10px 20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body1">
                            {`${index + 1}. ${term}`}
                          </Typography>
                          <Box
                            sx={{
                              minWidth: "100px",
                              display: "flex",
                              alignItems: "center",
                              columnGap: "6px",
                            }}
                          >
                            <CloseIcon
                              onClick={() => handleRemoveTerm(index)}
                              sx={{
                                cursor: "pointer",
                                fontSize: "20px",
                                color: "red",
                              }}
                            />
                            <DragIndicatorIcon
                              sx={{
                                cursor: "pointer",
                                fontSize: "20px",
                                color: "red",
                              }}
                            />
                          </Box>
                        </Box>
                        <Divider />
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Box mt={4}>
        <TextField
          fullWidth
          label="Enter your Term here"
          variant="standard"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          sx={{ mb: 2 }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddTerm();
            }
          }}
        />
      </Box>
      <Button color="secondary" startIcon={<Add />} onClick={handleAddTerm}>
        Add new term
      </Button>
    </Box>
  );
};

export default DraggableListItems;
