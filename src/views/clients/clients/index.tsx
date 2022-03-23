import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getClients } from "api/services/client";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType } from "components/Table";
import useQueryParams from "hooks/useQueryParams";
import useTitle from "hooks/useTitle";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";
import AddClient from "views/clients/clients/AddClient";
import CustomizeColumns from "views/clients/clients/CustomizeColumns";
import ClientFilter from "views/clients/clients/Filter";
import ImportClients from "views/clients/clients/ImportClients";
import Actions from "./Actions";

function Clients() {
  useTitle("Clients");
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

  const navigate = useNavigate();
  const [limit, setLimit] = useState<number>(50);
  const [offset, setOffset] = useState<number>(0);
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<any[]>([]);
  const selectionRef = useRef<any>({});
  const { queryParams, setQueryParams } = useQueryParams();

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

  const handleRowClick = (v: any) => {
    navigate(
      `/clients/${v?.id}/profile?displayName=${v?.displayName}&clientId=${v?.clientId}`
    );
  };

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
          <Box display="flex" gap={2}>
            {selected.length > 0 && (
              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant="outlined"
                color="secondary"
                endIcon={<KeyboardArrowDownOutlinedIcon />}
              >
                Actions
              </Button>
            )}
            <Button
              onClick={() => setOpenImportDialog(true)}
              variant="outlined"
              startIcon={<ImportExportIcon />}
              color="secondary"
            >
              Import Clients
            </Button>
          </Box>
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
          selectionRef: selectionRef,
          onSelect: (selected) => {
            setSelected(selected);
          },
        }}
      />
      <FloatingButton
        onClick={() => {
          setQueryParams({
            ...queryParams,
            createClient: "true",
          });
        }}
      />
      <AddClient />
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
      <Actions
        clearSelection={selectionRef.current?.clearSelection}
        selected={selected}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </Box>
  );
}

export default Clients;
