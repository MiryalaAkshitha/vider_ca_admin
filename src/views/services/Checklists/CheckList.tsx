import { Add, KeyboardArrowUp, MoreVert } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { snack } from "components/toast";
import { useMenu } from "context/MenuPopover";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteChecklist,
  updateChecklistName,
} from "redux/reducers/addServiceSlice";
import AddChecklistItem from "./AddChecklistItem";
import CheckListItem from "./ChecklistItem";
import { StyledChecklist } from "./styles";

type Props = {
  data: any;
  index: number;
};

const CheckList = ({ data, index }: Props) => {
  const dispatch = useDispatch();
  const menu = useMenu();
  const [show, setShow] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const handleNameChange = (e: React.FocusEvent<HTMLDivElement>) => {
    const name = e.currentTarget.innerText;

    if (name.trim() === "") {
      snack.error("Checklist name cannot be empty");
      e.currentTarget.innerText = data.name;
      return;
    }

    dispatch(
      updateChecklistName({
        index,
        name,
      })
    );
  };

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Delete",
          action: () => {
            dispatch(deleteChecklist(index));
          },
        },
      ],
    });
  };

  return (
    <>
      <StyledChecklist>
        <header>
          <Typography variant="h6">
            <div
              contentEditable
              onBlur={handleNameChange}
              suppressContentEditableWarning={true}
            >
              {data?.name}
            </div>
          </Typography>
          <Box display="flex" gap={1}>
            <IconButton onClick={() => setShow(!show)}>
              <KeyboardArrowUp />
            </IconButton>
            <IconButton onClick={handleMenu}>
              <MoreVert />
            </IconButton>
          </Box>
        </header>
        {show && (
          <Box>
            {data?.checklistItems?.map((item: any, itemIndex: number) => (
              <CheckListItem
                data={item}
                checklistIndex={index}
                index={itemIndex}
                key={itemIndex}
              />
            ))}
            <Box textAlign="right" pt={2} pb={1} pr={1}>
              <Button
                startIcon={<Add />}
                onClick={() => {
                  setOpen(true);
                }}
                color="secondary"
              >
                Add new checklist item
              </Button>
            </Box>
          </Box>
        )}
      </StyledChecklist>
      <AddChecklistItem open={open} setOpen={setOpen} index={index} />
    </>
  );
};

export default CheckList;
