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

const EmailTemplatesList = [
  { name: "Email Template Title 1", lastUpadated: "24-08-2022", category: "IT Returns" },
  { name: "Email Template Title 2", lastUpadated: "28-06s-2022", category: "GST" },
  {
    name: "Email Template Title 3",
    lastUpadated: "23-06-2022",
    category: "Company Registration",
  },
];

function EmailTemplates() {
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
      const filterGroup = EmailTemplatesList.filter((data) =>
        data.name.toLowerCase().includes(search.toLowerCase())
      );
      return filterGroup;
    }
    return EmailTemplatesList;
  };

  return (
    <>
      {show ? (
        <Box px={3} py={2}>
          <Box display="flex" gap={1} justifyContent="flex-start" alignItems="center">
            <SearchContainer
              value={search}
              placeHolder="Search Email Templates by Name"
              onChange={setSearch}
            />
            <Button sx={{ minWidth: 0 }} variant="outlined">
              <ImportExportIcon />
            </Button>
          </Box>
          <Grid container spacing={2} mt={2}>
            {filter().map((email) => (
              <Grid item xs={4} key={email.lastUpadated}>
                <EmailCard open={open} setOpen={setOpen} client={email} />
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
            btnTitle="Create email template"
            title="There are no Email templates"
            desc="Click on create email template to add a template"
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

export default EmailTemplates;

function EmailCard({ setOpen, open, client }) {
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
          label: "PreView",
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
            <Typography
              p={1}
              variant="body2"
              sx={{ backgroundColor: "green", color: "white", borderRadius: "10px" }}
            >
              {client.category}
            </Typography>
            <Typography sx={{ opacity: 0.4 }} gutterBottom variant="h6">
              updated on {client.lastUpadated}
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
