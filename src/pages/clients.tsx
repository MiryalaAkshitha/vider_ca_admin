import Table from "components/Table";
import { Add } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { getClients } from "api/client";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import AddClient from "views/clients/AddClient";
import SearchContainer from "components/SearchContainer";
import useTitle from "hooks/useTitle";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ClientFilter from "views/clients/Filter";
import { useSelector } from "react-redux";
import { selectClient } from "redux/reducers/clientSlice";
import { useNavigate } from "react-router-dom";

let LIMIT = 5;

const columns = [
  { key: "displayName", title: "Display Name" },
  { key: "category", title: "Cateogory" },
  { key: "subCategory", title: "Sub Category" },
  { key: "mobileNumber", title: "Mobile Number" },
  { key: "email", title: "Email" },
];

export interface ClientResponse {
  data: any[];
}

function Clients() {
  const navigate = useNavigate();
  const { appliedFilter } = useSelector(selectClient);
  const [offset, setOffset] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading }: UseQueryResult<ClientResponse, Error> = useQuery(
    [
      "clients",
      {
        limit: LIMIT,
        offset: offset > 0 ? (offset - 1) * LIMIT : offset,
        query: { ...appliedFilter, search },
      },
    ],
    getClients
  );

  useTitle("Clients");

  return (
    <Box p={3}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={5}>
          <Box display="flex" gap={2} alignItems="center">
            <SearchContainer
              debounced
              onChange={(v) => setSearch(v)}
              placeHolder="Search by display name"
            />
            <IconButton
              onClick={() => setOpenFilter(true)}
              color="primary"
              sx={{ border: "1px solid lightgrey", borderRadius: "4px" }}
            >
              <FilterAltOutlinedIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item>
          <Button
            onClick={() => setOpen(true)}
            variant="outlined"
            startIcon={<Add />}
            color="secondary"
          >
            Add Client
          </Button>
        </Grid>
      </Grid>
      <Table
        sx={{ mt: 3 }}
        loading={isLoading}
        onRowClick={(v) => navigate(`/clients/${v?.clientId}/profile`)}
        data={data?.data[0] || []}
        columns={columns}
        pagination={{
          totalCount: data?.data[1],
          pageCount: 5,
          onChange: (v) => setOffset(v),
        }}
      />
      <AddClient open={open} setOpen={setOpen} />
      <ClientFilter open={openFilter} setOpen={setOpenFilter} />
    </Box>
  );
}

export default Clients;
