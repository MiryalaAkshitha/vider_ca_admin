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
import AddClientGroup from "views/communication/client-groups/add-client-group";
import { useNavigate } from "react-router-dom";

const ClientGroupList = [
  { name: "Group1", noOfClients: 12, category: "IT Returns" },
  { name: "Group2", noOfClients: 13, category: "GST" },
  { name: "Group3", noOfClients: 14, category: "Company Registration" },
];

function ClientGroups() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");

  //for empty show purpose
  const [show, setShow] = useState(true);

  const onUserCreate = (users, title) => {
    // console.log(users);
  };

  const filter = () => {
    if (search) {
      const filterGroup = ClientGroupList.filter((data) =>
        data.name.toLowerCase().includes(search.toLowerCase())
      );
      return filterGroup;
    }
    return ClientGroupList;
  };

  return (
    <>
      {show ? (
        <Box px={3} py={2}>
          <Box display="flex" gap={1} justifyContent="flex-start" alignItems="center">
            <SearchContainer
              value={search}
              placeHolder="Search by group name"
              onChange={setSearch}
            />
            <Button sx={{ minWidth: 0 }} variant="outlined">
              <ImportExportIcon />
            </Button>
          </Box>
          <Grid container spacing={2} mt={2}>
            {filter().map((clientgroup) => (
              <Grid item xs={4} key={clientgroup.noOfClients}>
                <ClientGroup open={open} setOpen={setOpen} client={clientgroup} />
              </Grid>
            ))}
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
          <AddClientGroup
            open={open}
            setOpen={setOpen}
            onUserCreate={onUserCreate}
            usersTitle={onUserCreate}
          />
        </Box>
      ) : (
        <>
          <EmptyPage
            btnTitle="Create client group"
            title="There are no client groups"
            desc="Click on create client group to add a client group"
            btnAction={() => setEdit(!edit)}
          />
          <AddClientGroup
            open={edit}
            setOpen={setEdit}
            onUserCreate={onUserCreate}
            usersTitle={onUserCreate}
          />
        </>
      )}
    </>
  );
}

export default ClientGroups;

function ClientGroup({ setOpen, open, client }) {
  const confirm = useConfirm();
  const menu = useMenu();
  const navigate = useNavigate();

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this form validation?",
      action: () => {},
    });
  };

  const handleView = () => {
    navigate("userView");
  };

  const handleEdit = () => {
    setOpen(!open);
  };

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "View",
          action: handleView,
        },
        {
          label: "Edit",
          action: handleEdit,
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "8px",
            }}
          >
            <Typography gutterBottom variant="body1">
              {client.name}
            </Typography>
            <Typography sx={{ opacity: 0.4 }} gutterBottom variant="h6">
              {client.noOfClients} Clients
            </Typography>
            <Typography
              p={1}
              variant="body2"
              sx={{ backgroundColor: "green", color: "white", borderRadius: "10px" }}
            >
              {client.category}
            </Typography>
          </Box>
        </Link>
        <IconButton onClick={handleMenu}>
          <MoreVertIcon />
        </IconButton>
      </Paper>
    </>
  );
}
