import ImportExportIcon from "@mui/icons-material/ImportExport";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import EmptyPage from "components/EmptyPage";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AddGroup from "views/communication/user-groups/add-group";

function UserTeams() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  //for temp length empty purpose
  const [show, setShow] = useState(true);

  const onCreateUsers = (users, userTitle) => {
    setUserData(users);
    setTitle(userTitle);
  };

  return (
    <>
      {show ? (
        <Box px={3} py={2}>
          <Box display="flex" gap={1} justifyContent="flex-start" alignItems="center">
            <SearchContainer
              value={search}
              placeHolder="Search by user team name"
              onChange={setSearch}
            />
            <Button sx={{ minWidth: 0 }} variant="outlined">
              <ImportExportIcon />
            </Button>
          </Box>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={4}>
              <UserTeamCard edit={edit} setEdit={setEdit} />
            </Grid>
            <Grid item xs={4}>
              <UserTeamCard edit={edit} setEdit={setEdit} />
            </Grid>
            <Grid item xs={4}>
              <UserTeamCard edit={edit} setEdit={setEdit} />
            </Grid>
          </Grid>
          <Box flex={1}>
            <Outlet />
          </Box>
          <FloatingButton
            position="right"
            onClick={() => {
              setOpen(true);
            }}
          />
          <AddGroup
            open={open}
            setOpen={setOpen}
            onUserCreate={onCreateUsers}
            usersTitle={onCreateUsers}
          />
        </Box>
      ) : (
        <>
          <EmptyPage
            btnTitle="Create user team"
            title="There are no user teams"
            desc="Click on create user team and add users"
            btnAction={() => setEdit(!edit)}
          />
          <AddGroup
            open={edit}
            setOpen={setEdit}
            onUserCreate={onCreateUsers}
            usersTitle={onCreateUsers}
          />
        </>
      )}
    </>
  );
}

export default UserTeams;

function UserTeamCard({ setEdit, edit }) {
  const confirm = useConfirm();
  const menu = useMenu();

  const handleDelete = () => {
    confirm({
      msg: "Are you sure, you want to delete this userTeam?",
      action: () => alert("user deleted!"),
    });
  };

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => setEdit(!edit),
        },
        {
          label: "Delete",
          action: handleDelete,
        },
      ],
    });
  };

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 16px",
          borderRadius: "8px",
        }}
      >
        <Link to="user-view" style={{ textDecoration: "none", color: "initial" }}>
          <Box>
            <Typography variant="body1">User Team 1</Typography>
            <Typography sx={{ opacity: 0.5 }} variant="caption">
              19 clients
            </Typography>
          </Box>
        </Link>
        <IconButton onClick={handleMenu}>
          <MoreVertIcon />
        </IconButton>
      </Paper>
      <AddGroup open={edit} setOpen={setEdit} />
    </>
  );
}
