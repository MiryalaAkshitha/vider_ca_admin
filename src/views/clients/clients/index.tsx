import { Delete } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, CircularProgress, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { bulkDelete, getClients } from "api/services/client";
import { useConfirm } from "components/ConfirmDialogProvider";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType } from "components/Table";
import useSnack from "hooks/useSnack";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";
import AddClient from "views/clients/clients/AddClient";
import CustomizeColumns from "views/clients/clients/CustomizeColumns";
import ClientFilter from "views/clients/clients/Filter";
import ImportClients from "views/clients/clients/ImportClients";

function Clients() {
  useTitle("Clients");
  const queryClient = useQueryClient();
  const defaultColumns: Array<ColumnType> = [
    { key: "displayName", title: "Display Name" },
    { key: "tradeName", title: "Trade Name", hide: true },
    { key: "clientId", title: "Client Id", hide: true },
    {
      key: "category",
      title: "Category",
      render: (rowData) => getTitle(rowData?.category),
    },
    {
      key: "subCategory",
      title: "Sub Category",
      render: (rowData) => getTitle(rowData?.subCategory),
    },
    { key: "mobileNumber", title: "Mobile Number" },
    { key: "email", title: "Email" },
    { key: "panNumber", title: "Pan Number", hide: true },
    { key: "authorizedPerson", title: "Authorized Person", hide: true },
    {
      key: "active",
      title: "Status",
      hide: true,
      render: (rowData) => {
        return (
          <div>
            {rowData?.active ? (
              <span style={{ color: "green" }}>Active</span>
            ) : (
              <span style={{ color: "red" }}>Inactive</span>
            )}
          </div>
        );
      },
    },
  ];

  const confirm = useConfirm();
  const navigate = useNavigate();
  const snack = useSnack();
  const [limit, setLimit] = useState<number>(50);
  const [offset, setOffset] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openImportDialog, setOpenImportDialog] = useState<boolean>(false);
  const [openCustomColumns, setOpenCustomColumns] = useState<boolean>(false);
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
        limit: limit,
        offset: offset * limit,
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
      queryClient.invalidateQueries("clients");
      setOffset(0);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleRowClick = (v: any) => {
    navigate(
      `/clients/${v?.id}/profile?displayName=${v?.displayName}&clientId=${v?.clientId}`
    );
  };

  const handleDelete = (selected: any) => {
    confirm({
      msg: "Are you sure you want to delete?",
      action: () => {
        mutate({
          ids: selected.map((c: any) => c.id),
        });
      },
    });
  };

  if (deleteLoading) return <CircularProgress />;

  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={5}>
          <Box display="flex" gap={2} alignItems="center">
            <SearchContainer
              debounced
              minWidth="400px"
              onChange={(v) => {
                setFilters({
                  ...filters,
                  search: v,
                });
              }}
              placeHolder="Search"
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
            onClick={() => setOpenImportDialog(true)}
            variant="outlined"
            startIcon={<ImportExportIcon />}
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
        onRowClick={(v) => handleRowClick(v)}
        data={data?.data[0] || []}
        columns={columns}
        pagination={{
          totalCount: data?.data[1],
          pageCount: limit,
          onPageCountChange: (v) => setLimit(v),
          onChange: (v) => {
            setOffset(v);
          },
        }}
        selection={{
          toolbar: (selected) => (
            <IconButton
              color="secondary"
              onClick={() => handleDelete(selected)}
            >
              <Delete />
            </IconButton>
          ),
        }}
      />
      <FloatingButton onClick={() => setOpen(true)} />
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
