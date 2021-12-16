import { Add, KeyboardArrowUp, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { deleteChecklist, updateChecklist } from "api/services/tasks";
import useSnack from "hooks/useSnack";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import AddChecklistItem from "./AddChecklistItem";
import CheckListItem from "./ChecklistItem";
import { StyledChecklist } from "./styles";

type Props = {
  data: any;
};

const CheckList = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [show, setShow] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChecklist, setSelectedChecklist] = useState<number | null>(
    null
  );

  const { mutate: checklistDelete } = useMutation(deleteChecklist, {
    onSuccess: () => {
      snack.success("Checklist deleted");
      queryClient.invalidateQueries("checklists");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate } = useMutation(updateChecklist, {
    onSuccess: () => {
      snack.success("Checklist udpated");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChecklistDelete = () => {
    checklistDelete({
      id: data.id,
    });
  };

  const handleNameChange = (e: React.FocusEvent<HTMLDivElement>) => {
    const name = e.currentTarget.innerText;

    if (name.trim() === "") {
      snack.error("Checklist name cannot be empty");
      e.currentTarget.innerText = data.name;
      return;
    }
    if (name === data.name) return;

    mutate({
      data: {
        ...data,
        name: name,
      },
    });
  };

  return (
    <>
      <StyledChecklist>
        <header>
          <Typography variant="h6">
            <div contentEditable onBlur={handleNameChange}>
              {data?.name}
            </div>
          </Typography>
          <Box display="flex" gap={1}>
            <IconButton onClick={() => setShow(!show)}>
              <KeyboardArrowUp />
            </IconButton>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVert />
            </IconButton>
          </Box>
        </header>
        {show && (
          <Box>
            {data?.checklistItems?.map((item: any, index: number) => (
              <CheckListItem data={item} index={index} />
            ))}
            <Box textAlign="right" pt={2} pb={1} pr={1}>
              <Button
                startIcon={<Add />}
                onClick={() => {
                  setOpen(true);
                  setSelectedChecklist(data?.id);
                }}
                color="secondary"
              >
                Add new checklist item
              </Button>
            </Box>
          </Box>
        )}
      </StyledChecklist>
      <AddChecklistItem
        selectedChecklist={selectedChecklist}
        open={open}
        setOpen={setOpen}
      />
      <Menu
        anchorEl={anchorEl}
        onClick={() => setAnchorEl(null)}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleChecklistDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default CheckList;
