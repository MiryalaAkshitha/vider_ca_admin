import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterListIcon from "@mui/icons-material/FilterList";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUsers from "views/communication/user-groups/add-users";
import EditUserTeam from "views/communication/user-groups/user-view-teamEdit";
import { StyledServicesContainer } from "views/tasks/board/CreateTask/styles";
const columns = [
  {
    id: 1,
    key: "clientname",
    title: "Client name",
  },
  {
    id: 2,
    key: "clientcategory",
    title: "Client Category",
    // render: (rowData: any) => getTitle(rowData?.subCategory),
  },
  {
    id: 3,
    key: "mailid",
    title: "Mail ID",
  },
  {
    id: 4,
    key: "numberofclientusers",
    title: "Number of client users available",
  },
  {
    id: 5,
    key: "numberofclientusesadded",
    title: "Number of client users added",
  },
  {
    id: 6,
    key: "actions",
    title: "Actions",
    render: (row: any) => <Actions data={row} />,
  },
];

const TableRawData = [
  {
    id: 1,
    clientname: "a",
    clientcategory: "GST1",
    mailid: "a@vider.in",
    numberofclientusers: 12,
    numberofclientusesadded: 9,
  },
  {
    id: 2,
    clientname: "b",
    entitycategory: "GST2",
    mailid: "b@vider.in",
    numberofclientusers: 13,
    numberofclientusesadded: 8,
  },
  {
    id: 3,
    clientname: "c",
    entitycategory: "GST3",
    mailid: "c@vider.in",
    numberofclientusers: 14,
    numberofclientusesadded: 7,
  },
];

const ClientGroupView = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const confirm = useConfirm();
  const menu = useMenu();

  const onSelect = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this form validation?",
      action: () => alert("client tile delete!"),
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
    <Box p={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <ArrowBackIcon onClick={() => navigate(-1)} />
        <Typography variant="subtitle2" ml={1}>
          Client Groups/Group1
        </Typography>
      </Box>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <Box p={2}>
          <Typography color="#0D47A1" variant="subtitle2" gutterBottom>
            Team Title 1
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta doloremque aliquam quae
            nihil vel nulla eum animi placeat saepe libero!
          </Typography>
        </Box>
        <IconButton onClick={handleMenu}>
          <MoreVertIcon />
        </IconButton>
      </Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
          <SearchContainer value={search} onChange={setSearch} placeHolder="Search for a client" />
          <IconButton>
            <ImportExportIcon />
          </IconButton>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Stack>

        <Button variant="outlined" color="secondary" onClick={onSelect}>
          + Add new Client
        </Button>
      </Box>

      <StyledServicesContainer>
        <Table data={TableRawData} columns={columns} />
      </StyledServicesContainer>
      <Paper sx={{ padding: "10px" }}>
        <Button variant="contained" color="secondary">
          Save Changes
        </Button>
      </Paper>
      <AddUsers open={open} setOpen={setOpen} onSelect={onSelect} />
      <EditUserTeam open={edit} setOpen={setEdit} />
    </Box>
  );
};

const Actions = ({ data }) => {
  const menu = useMenu();
  const confirm = useConfirm();
  const navigate = useNavigate();

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this user?",
      action: () => alert("need to delete user!"),
    });
  };

  const handleUpdate = () => {
    navigate("groupId");
  };

  const handleMenu = (e: any) => {
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Update Client Users",
          action: handleUpdate,
        },
        {
          label: "Remove user",
          action: handleDelete,
        },
      ],
    });
  };

  return (
    <>
      <Box>
        <IconButton onClick={handleMenu}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default ClientGroupView;
