import ImportExportIcon from "@mui/icons-material/ImportExport";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, IconButton, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import GroupAdd from "views/communication/user-groups/addGroup";
import EditGroup from "views/communication/user-groups/editGroup";
import { Link } from "react-router-dom";

const Groups = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <Box px={3} py={2}>
      <Box display="flex" gap={1} justifyContent="flex-start" alignItems="center">
        <SearchContainer
          value={search}
          placeHolder="Search by Name / Client Type"
          onChange={setSearch}
        />
        <Button sx={{ minWidth: 0 }} variant="outlined">
          <ImportExportIcon />
        </Button>
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={4}>
          <Group edit={edit} setEdit={setEdit} />
        </Grid>
        <Grid item xs={4}>
          <Group edit={edit} setEdit={setEdit} />
        </Grid>
        <Grid item xs={4}>
          <Group edit={edit} setEdit={setEdit} />
        </Grid>
      </Grid>
      <FloatingButton
        position="right"
        onClick={() => {
          setOpen(true);
        }}
      />
      <GroupAdd open={open} setOpen={setOpen} />
      <EditGroup open={edit} setOpen={setEdit} data="" />
    </Box>
  );
};

export default Groups;

function Group({ setEdit, edit }) {
  const confirm = useConfirm();
  const menu = useMenu();
  // const [edit, setEdit] = useState(false);
  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this form validation?",
      action: () => {},
    });
  };
  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => setEdit(true),
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
        <Link to="/particulargroup" style={{ textDecoration: "none", color: "initial" }}>
          <Box>
            <Typography variant="body1">Group Gst</Typography>
            <Typography variant="caption">10 members</Typography>
          </Box>
        </Link>
        <IconButton onClick={handleMenu}>
          <MoreVertIcon />
        </IconButton>
      </Paper>
    </>
  );
}
