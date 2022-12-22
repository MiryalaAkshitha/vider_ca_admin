import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DrawerWrapper from "components/DrawerWrapper";
import { useState } from "react";
import { DialogProps } from "types";
import AddUsers from "views/communication/user-groups/add-users";

interface Props extends DialogProps {
  onUserCreate?: any;
  usersTitle?: any;
}

function AddUserTeam({ open, setOpen, onUserCreate, usersTitle }: Props) {
  const [selectUser, setSelectUser] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [userTitle, setUserTitle] = useState("");

  const onSelect = (users: any[]) => {
    setUsers(users);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserCreate(users, userTitle);
    // console.log(users, userTitle);
  };

  return (
    <>
      <DrawerWrapper open={open} setOpen={setOpen} title="New User Team">
        <form onSubmit={handleSubmit}>
          <TextField
            label="User Team Title"
            name="name"
            size="small"
            fullWidth
            onChange={(e) => setUserTitle(e.target.value)}
            value={userTitle}
          />
          <Box
            sx={{
              mt: 2,
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
                Select Users
              </Typography>
            )}
          </Box>
          <Box mt={2} textAlign="center">
            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </DrawerWrapper>
      <AddUsers open={selectUser} setOpen={setSelectUser} onSelect={onSelect} />
    </>
  );
}

export default AddUserTeam;
