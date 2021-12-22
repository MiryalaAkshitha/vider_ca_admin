import { Add } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getClients } from "api/services/client";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType } from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import AddClient from "views/clients/AddClient";
import CustomizeColumns from "views/clients/CustomizeColumns";
import ClientFilter from "views/clients/Filter";
import ImportClients from "views/clients/ImportClients";

const LIMIT = 5;

function Clients() {
  const defaultColumns: Array<ColumnType> = [
    { key: "displayName", title: "Display Name" },
    { key: "clientId", title: "Client Id", hide: true },
    { key: "category", title: "Cateogory" },
    { key: "subCategory", title: "Sub Category" },
    { key: "mobileNumber", title: "Mobile Number" },
    { key: "email", title: "Email" },
    { key: "panNumber", title: "Pan Number", hide: true },
    { key: "authorizedPerson", title: "Authorized Person", hide: true },
  ];

  const navigate = useNavigate();
  const [offset, setOffset] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openImportDialog, setOpenImportDialog] = useState<boolean>(false);
  const [openCustomizeColumns, setOpenCustomizeColumns] =
    useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [columns, setColumns] = useState<Array<ColumnType>>([
    ...defaultColumns,
  ]);
  const [filters, setFilters] = useState({
    category: [],
    subCategory: [],
    monthAdded: "",
    labels: [],
    search: "",
  });

  const { data, isLoading }: ResType = useQuery(
    [
      "clients",
      {
        limit: LIMIT,
        offset: offset > 0 ? (offset - 1) * LIMIT : offset,
        query: {
          ...filters,
          category: filters.category.map((c: any) => c?.value),
          subCategory: filters.subCategory.map((c: any) => c?.value),
          labels: filters.labels.map((c: any) => c?.id),
        },
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
              onChange={(v) => {
                setFilters({
                  ...filters,
                  search: v,
                });
              }}
              placeHolder="Search by display name"
            />
            <Button
              startIcon={<FilterAltOutlinedIcon />}
              onClick={() => setOpenFilter(true)}
              color="primary"
              sx={{ border: "1px solid lightgrey", borderRadius: "4px" }}
            >
              Filters
            </Button>
            <Button
              startIcon={<SettingsIcon />}
              onClick={() => setOpenCustomizeColumns(true)}
              color="primary"
              sx={{ border: "1px solid lightgrey", borderRadius: "4px" }}
            >
              Columns
            </Button>
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
          <Button
            onClick={() => setOpenImportDialog(true)}
            variant="outlined"
            startIcon={<Add />}
            color="secondary"
            sx={{ ml: 2 }}
          >
            Import Clients
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
      <ImportClients open={openImportDialog} setOpen={setOpenImportDialog} />
      <ClientFilter
        filters={filters}
        setFilters={setFilters}
        open={openFilter}
        setOpen={setOpenFilter}
      />
      <CustomizeColumns
        defaultColumns={defaultColumns}
        columns={columns}
        setColumns={setColumns}
        open={openCustomizeColumns}
        setOpen={setOpenCustomizeColumns}
      />
    </Box>
  );
}

export default Clients;
