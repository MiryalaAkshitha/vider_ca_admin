import { Box, Button, Divider, Icon } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import DialogWrapper from "components/DialogWrapper";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { useState } from "react";
import { DialogProps } from "types";
import { StyledServicesContainer } from "views/tasks/board/CreateTask/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Stack from "@mui/material/Stack";

const columns = [
  {
    id: 1,
    key: "userName",
    title: "User name",
  },
  {
    id: 2,
    key: "role",
    title: "Role",
  },
  {
    id: 3,
    key: "mobileNumber",
    title: "Mobile Number",
  },
  {
    id: 4,
    key: "mailId",
    title: "Mail Id",
  },
];

const TableRawData = [
  {
    id: 1,
    userName: "vivek",
    mobileNumber: "9652963199",
    mailId: "vivekmyadaram@vider.in",
    category: "GST1",
    role: "Role1",
  },
  {
    id: 2,
    userName: "rajkumar",
    mobileNumber: "9652963198",
    mailId: "raj@vider.in",
    category: "GST1",
    role: "Role2",
  },
  {
    id: 3,
    userName: "akshitha",
    mobileNumber: "9638527412",
    mailId: "akshitha@vider.in",
    category: "GST1",
    role: "Role3",
  },
];

const categories = [
  { id: 1, category: "GST1", name: "GST" },
  { id: 2, category: "GST2", name: "GST1" },
  { id: 3, category: "GST3", name: "GST2" },
];

interface Props extends DialogProps {
  onSelect: (users: any[]) => void;
}

function AddUsers({ open, setOpen, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    onSelect(selected);
    setOpen(!open);
  };

  const filterUsers = () => {
    if (search || category) {
      const selectedCategory = TableRawData.filter((user) => user.category === category);
      const searchedUsers = selectedCategory.filter((user) =>
        user.userName.toLowerCase().includes(search.toLowerCase())
      );
      return searchedUsers;
    }
    return TableRawData;
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <DialogWrapper width="md" open={open} setOpen={setOpen} title="Add users">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
          <SearchContainer
            value={search}
            placeHolder="Search for a user"
            minWidth="400px"
            onChange={setSearch}
          />
          <IconButton>
            <ImportExportIcon />
          </IconButton>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Stack>
        <TextField
          name="category"
          value={category}
          onChange={onChangeCategory}
          size="small"
          label="Select role"
          select
          sx={{ width: "250px" }}
        >
          {categories.map((option: any, index: any) => (
            <MenuItem key={index} value={option.category}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Divider sx={{ mt: 2 }} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StyledServicesContainer>
            <Table data={filterUsers()} columns={columns} selection={{ selected, setSelected }} />
          </StyledServicesContainer>
          <Box
            sx={{
              textAlign: "center",
              background: "white",
            }}
          >
            <Button
              sx={{ minWidth: 300 }}
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
              size="large"
            >
              Select Task
            </Button>
          </Box>
        </>
      )}
    </DialogWrapper>
  );
}

export default AddUsers;
