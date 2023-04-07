import Add from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { handleExistingTermsAndConditions, selectEstimate } from "redux/reducers/createEstimateSlice";
import {
  handleAddTermsAndConditions,
  handleRemoveTermsAndConditions,
  handleUpdateTermsAndConditions,
} from "redux/reducers/createEstimateSlice";
import SectionHeading from "../SectionHeading";

const TermsAndConditions = ({result}) => {
  const dispatch = useDispatch();
  const { termsAndConditions } = useSelector(selectEstimate);
  const [term, setTerm] = useState("");

  useEffect(() => {
    if(result?.termsAndConditions && result?.termsAndConditions.length>0) {
      setTimeout((i) => {
        dispatch(handleExistingTermsAndConditions(result?.termsAndConditions));
     }, 500);
    }
  }, []);

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
      <Box sx={{ mb: 2, p: 2 }}>
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
                          mb={1}
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
        <Button color="secondary" startIcon={<Add />} onClick={handleAddTerm}>
          Add new term
        </Button>
      </Box>
    </Box>
  );
};

export default TermsAndConditions;
