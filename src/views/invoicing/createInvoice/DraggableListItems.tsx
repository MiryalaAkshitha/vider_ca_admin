import React, { useState } from "react";
import { Divider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Add from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const termsData = [
  "Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.",
  "Please quote invoice number when remitting funds.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid rerum ratione reprehenderit!",
];

const DraggableListItems = () => {
  const [terms, updateTerms] = useState([...termsData]);
  const [term, setTerm] = useState("");

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(terms);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateTerms(items);
  }

  function handleAddTerm() {
    if (term !== "") {
      updateTerms([...terms, term]);
    }
  }

  function handleRemoveTerm(index) {
    let tempArr = [...terms];
    tempArr.splice(index, 1);
    updateTerms([...tempArr]);
  }

  return (
    <Box sx={{ padding: "20px 0" }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="terms">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {terms.map((term, index) => {
                return (
                  <Draggable key={index} draggableId={index.toString()} index={index}>
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
                          <Typography
                            component="div"
                            sx={{
                              fontWeight: "600",
                            }}
                          >
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
                              sx={{ cursor: "pointer", fontSize: "20px", color: "red" }}
                            />
                            {index < terms.length - 1 ? (
                              <ArrowDownwardRoundedIcon
                                sx={{ cursor: "pointer", fontSize: "20px", color: "red" }}
                              />
                            ) : null}
                            {index !== 0 ? (
                              <ArrowUpwardRoundedIcon
                                sx={{ cursor: "pointer", fontSize: "20px", color: "red" }}
                              />
                            ) : null}
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

      <Box
        sx={{
          padding: "10px 20px",
        }}
      >
        <TextField
          sx={{
            "& .MuiInput-root": {
              "::before": {
                content: "normal",
                border: "0",
              },
            },
          }}
          fullWidth
          label="Enter your Term here"
          variant="standard"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddTerm();
            }
          }}
        />
      </Box>
      <Divider />

      <Typography
        sx={{
          color: "#F2353C",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          marginTop: "10px",
          width: "fit-content",
        }}
        onClick={handleAddTerm}
      >
        <Add /> Add new Term
      </Typography>
    </Box>
  );
};

export default DraggableListItems;
