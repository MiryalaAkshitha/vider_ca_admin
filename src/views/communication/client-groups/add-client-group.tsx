import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DrawerWrapper from "components/DrawerWrapper";
import { useState } from "react";
import { DialogProps } from "types";
import AddClients from "views/communication/client-groups/add-clients";

import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

interface Props extends DialogProps {
  onUserCreate?: any;
  usersTitle?: any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const names = ["group1", "group2", "group3", "group4", "group5", "group6"];

function AddClientGroup({ open, setOpen, onUserCreate, usersTitle }: Props) {
  const [groupName, setGroupName] = useState("");
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState("");
  const [selectUser, setSelectUser] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  const onSelect = (users: any[]) => {
    setUsers(users);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserCreate(users, groupName);
    setOpen(!open);
    setGroupName("");
    setTags([]);
    setDesc("");
    setUsers([]);
  };

  return (
    <>
      <DrawerWrapper open={open} setOpen={setOpen} title="Group">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Group name"
            name="name"
            size="small"
            fullWidth
            onChange={(e) => setGroupName(e.target.value)}
            value={groupName}
          />
          <MultipleSelectChip onSetTags={setTags} />
          <TextField
            label="Group Description"
            name="name"
            size="medium"
            fullWidth
            type="textarea"
            multiline
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            sx={{ marginTop: "24px" }}
          />
          <Box mt={2}>
            <Typography sx={{ opacity: 0.4 }} variant="subtitle2">
              client
            </Typography>
            <Box
              sx={{
                p: 2,
                border: "1px dashed grey",
                maxWidth: "100%",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => setSelectUser(!selectUser)}
            >
              {users.length ? (
                <>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Stack direction="column" justifyContent="center" alignItems="flex-start">
                      <Typography variant="body2" sx={{ opacity: 0.4 }}>
                        Total number of user's selected
                      </Typography>
                      <Typography>{users.length}</Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                      <IconButton sx={{ opacity: 0.4 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton sx={{ opacity: 0.4 }}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                </>
              ) : (
                <Typography sx={{ opacity: 0.4 }} variant="subtitle2">
                  Select client
                </Typography>
              )}
            </Box>
            <Box mt={2} textAlign="center">
              <Button variant="contained" color="secondary" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </DrawerWrapper>
      <AddClients open={selectUser} setOpen={setSelectUser} selectedUsers={onSelect} />
    </>
  );
}

export default AddClientGroup;

function MultipleSelectChip({ onSetTags }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    onSetTags(personName);
  };

  return (
    <div>
      <FormControl sx={{ mt: 2, width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">Tags/Lables</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          fullWidth
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
