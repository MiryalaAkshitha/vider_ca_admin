import { Add, Delete } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, CircularProgress, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { bulkDelete, getClients } from "api/services/client";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType } from "components/Table";
import useSnack from "hooks/useSnack";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import AddClient from "views/clients/AddClient";
import CustomizeColumns from "views/clients/CustomizeColumns";
import ClientFilter from "views/clients/Filter";
import ImportClients from "views/clients/ImportClients";

function Clients() {
  useTitle("Clients");
  const queryClient = useQueryClient();
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
  const snack = useSnack();
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openImportDialog, setOpenImportDialog] = useState<boolean>(false);
  const [openCustomColumns, setOpenCustomColumns] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selected, setSelected] = useState<Array<number>>([]);
  const [unselected, setUnselected] = useState<Array<number>>([]);
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
        limit: limit,
        offset: offset > 0 ? (offset - 1) * limit : offset,
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

  const { mutate, isLoading: deleteLoading } = useMutation(bulkDelete, {
    onSuccess: () => {
      snack.success("Clients Deleted");
      setAllSelected(false);
      setSelected([]);
      setUnselected([]);
      setFilters({
        ...filters,
        category: [],
        subCategory: [],
        monthAdded: "",
        labels: [],
      });
      setOffset(0);
      queryClient.invalidateQueries("clients");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    mutate({
      data: {
        all: allSelected,
        unselected,
        selected,
        filters: {
          ...filters,
          category: filters.category.map((c: any) => c?.value),
          subCategory: filters.subCategory.map((c: any) => c?.value),
          labels: filters.labels.map((c: any) => c?.id),
        },
      },
    });
  };

  const handleSelect = (checked: boolean, v: any) => {
    if (allSelected) {
      if (!checked) {
        setUnselected([...unselected, v?.id]);
      } else {
        setUnselected(unselected.filter((c) => c !== v.id));
      }
    } else {
      if (checked) {
        setSelected([...selected, v?.id]);
      } else {
        setSelected(selected.filter((c) => c !== v.id));
      }
    }
  };

  if (deleteLoading) return <CircularProgress />;

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
              onClick={() => setOpenCustomColumns(true)}
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
          pageCount: limit,
          onPageCountChange: (v) => setLimit(v),
          onChange: (v) => setOffset(v),
        }}
        selection={{
          all: allSelected,
          selected: selected,
          unselected: unselected,
          onSelectAll: (v) => {
            setAllSelected(v);
          },
          onSelect: (checked, v) => handleSelect(checked, v),
          toolbar: (
            <IconButton color="secondary" onClick={handleDelete}>
              <Delete />
            </IconButton>
          ),
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
        open={openCustomColumns}
        setOpen={setOpenCustomColumns}
      />
    </Box>
  );
}

export default Clients;
