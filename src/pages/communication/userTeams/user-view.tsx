import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Paper, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { StyledServicesContainer } from "views/tasks/board/CreateTask/styles";
import AddUsers from "views/communication/user-groups/add-users";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import AddGroup from "views/communication/user-groups/add-group";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditUserTeam from "views/communication/user-groups/user-view-teamEdit";

const columns = [
  {
    id: 1,
    key: "clientname",
    title: "User name",
  },
  {
    id: 2,
    key: "entitycategory",
    title: "Role",
    // render: (rowData: any) => getTitle(rowData?.subCategory),
  },
  {
    id: 3,
    key: "mailid",
    title: "Mail ID",
  },
  {
    id: 4,
    key: "actions",
    title: "Actions",
    render: (row: any) => <Actions data={row} />,
  },
];

const TableRawData = [
  { id: 1, clientname: "a", entitycategory: "GST1", mailid: "a@vider.in" },
  { id: 2, clientname: "b", entitycategory: "GST2", mailid: "b@vider.in" },
  { id: 3, clientname: "c", entitycategory: "GST3", mailid: "c@vider.in" },
  { id: 4, clientname: "d", entitycategory: "GST4", mailid: "d@vider.in" },
  { id: 5, clientname: "e", entitycategory: "GST5", mailid: "e@vider.in" },
  { id: 6, clientname: "f", entitycategory: "GST6", mailid: "f@vider.in" },
  { id: 7, clientname: "g", entitycategory: "GST1", mailid: "g@vider.in" },
  { id: 8, clientname: "h", entitycategory: "GST1", mailid: "h@vider.in" },
];

const UserView = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any[]>([]);
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

  const onUserCreate = (users, title) => {
    console.log(users, title);
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
          User teams/User Team Details
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
        <SearchContainer value={search} onChange={setSearch} placeHolder="Search for a client" />
        <Button variant="outlined" color="secondary" onClick={onSelect}>
          + Add new User
        </Button>
      </Box>

      <StyledServicesContainer>
        <Table data={TableRawData} columns={columns} />
      </StyledServicesContainer>
      <AddUsers open={open} setOpen={setOpen} onSelect={onSelect} />
      <EditUserTeam open={edit} setOpen={setEdit} />
    </Box>
  );
};

const Actions = ({ data }) => {
  const menu = useMenu();
  const confirm = useConfirm();

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this user?",
      action: () => "delete user",
    });
  };

  const handleMenu = (e: any) => {
    menu({
      target: e.currentTarget,
      options: [
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

export default UserView;
