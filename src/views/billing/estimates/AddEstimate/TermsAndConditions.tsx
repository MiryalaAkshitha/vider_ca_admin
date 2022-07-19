import Add from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
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
import SectionHeading from "../SectionHeading";

const TermsAndConditions = () => {
  const dispatch = useDispatch();
  const { termsAndConditions } = useSelector(selectInvoice);
  const [term, setTerm] = useState("");

  function handleOnDragEnd(result: any) {
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

  function handleRemoveTerm(index: number) {
    dispatch(handleRemoveTermsAndConditions(index));
  }

  return (
    <Box mt={3}>
      <SectionHeading title="Terms & Conditions" />
      <Grid container spacing={3} mt={1}>
        <Grid item xs={8}>
          <Box sx={{ mb: 2 }}>
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
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Typography variant="body1">
                                  {`${index + 1}. ${term}`}
                                </Typography>
                                <Box sx={{}}>
                                  <IconButton>
                                    <CloseIcon
                                      onClick={() => handleRemoveTerm(index)}
                                    />
                                  </IconButton>
                                  <IconButton>
                                    <DragIndicatorIcon />
                                  </IconButton>
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
            <Box>
              <TextField
                fullWidth
                label="Enter your Term here"
                variant="standard"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                sx={{ mb: 2, mt: termsAndConditions.length > 0 ? 2 : 0 }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddTerm();
                  }
                }}
              />
            </Box>
            <Button
              color="secondary"
              startIcon={<Add />}
              onClick={handleAddTerm}
            >
              Add new term
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Typography>Signature / Digital Signature</Typography>
            <Box
              sx={{
                mt: 1,
                border: "1px solid lightgrey",
                width: "100%",
                height: "100px",
                borderRadius: "5px",
              }}
            ></Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TermsAndConditions;
