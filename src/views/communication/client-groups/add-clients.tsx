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
    key: "clientname",
    title: "Client name",
  },
  {
    id: 2,
    key: "clientcategory",
    title: "Client Category",
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
    clientname: "vivek",
    clientcategory: "individual",
    mobileNumber: "9652963199",
    mailId: "vivekmyadaram@vider.in",
  },
  {
    id: 2,
    clientname: "vinay",
    clientcategory: "company",
    mobileNumber: "9652963198",
    mailId: "vinay@vider.in",
  },
];

interface Props extends DialogProps {
  selectedUsers: (users: any[]) => void;
}

function AddClients({ open, setOpen, selectedUsers }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleSubmit = () => {
    selectedUsers(selected);
    setOpen(!open);
  };

  const filteredClients = () => {
    if (search) {
      const filterClients = TableRawData.filter((user) =>
        user.clientname.toLowerCase().includes(search.toLowerCase())
      );
      return filterClients;
    }
    return TableRawData;
  };

  return (
    <DialogWrapper width="md" open={open} setOpen={setOpen} title="Add Client">
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
      </Box>
      <Divider sx={{ mt: 2 }} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StyledServicesContainer>
            <Table
              data={filteredClients()}
              columns={columns}
              selection={{ selected, setSelected }}
            />
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
              Select Client
            </Button>
          </Box>
        </>
      )}
    </DialogWrapper>
  );
}

export default AddClients;
