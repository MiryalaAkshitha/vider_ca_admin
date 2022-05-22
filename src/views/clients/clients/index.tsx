import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Box } from "@mui/material";
import { getClients } from "api/services/client";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType } from "components/Table";
import ValidateAccess from "components/ValidateAccess";
import { usePermissions } from "context/PermissionsProvider";
import useQueryParams from "hooks/useQueryParams";
import useTitle from "hooks/useTitle";
import _ from "lodash";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";
import { Permissions } from "utils/permissons";
import AddClient from "views/clients/clients/AddClient";
import CustomizeColumns from "views/clients/clients/CustomizeColumns";
import ClientFilter from "views/clients/clients/Filter";
import ImportClients from "views/clients/clients/ImportClients";
import Actions from "./Actions";

function Clients() {
  useTitle("Clients");
  const navigate = useNavigate();
  const selectionRef = useRef<any>({});
  const { queryParams, setQueryParams } = useQueryParams();
  const { permissions } = usePermissions();
  const [limit, setLimit] = useState<number>(50);
  const [offset, setOffset] = useState<number>(0);
  const [openImportDialog, setOpenImportDialog] = useState<boolean>(false);
  const [openCustomColumns, setOpenCustomColumns] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<any[]>([]);
  const [columns, setColumns] = useState(_.cloneDeep(defaultColumns));
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

  const handleRowClick = (v: any) => {
    navigate(`/clients/${v?.id}/profile`);
  };

  return (
    <>
      <Box display="flex" gap={2}>
        <Box display="flex" flex={1} gap={2} alignItems="center">
          <SearchContainer
            value={filters.search}
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
        <Box display="flex" gap={2}>
          {selected.length > 0 && (
            <ValidateAccess name={Permissions.DELETE_CLIENT_PROFILE}>
              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant="outlined"
                color="secondary"
                endIcon={<KeyboardArrowDownOutlinedIcon />}
              >
                Actions
              </Button>
            </ValidateAccess>
          )}
          <ValidateAccess name={Permissions.CREATE_CLIENT_PROFILE}>
            <Button
              onClick={() => setOpenImportDialog(true)}
              variant="outlined"
              startIcon={<ImportExportIcon />}
              color="secondary"
            >
              Import Clients
            </Button>
          </ValidateAccess>
        </Box>
      </Box>
      <Table
        sx={{ mt: 3 }}
        loading={isLoading}
        onRowClick={(v) => {
          if (permissions.includes(Permissions.VIEW_CLIENT_PROFILE)) {
            handleRowClick(v);
          }
        }}
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
      <ValidateAccess name={Permissions.CREATE_CLIENT_PROFILE}>
        <FloatingButton
          onClick={() => {
            setQueryParams({
              ...queryParams,
              createClient: "true",
            });
          }}
        />
      </ValidateAccess>
      <AddClient />
      <ImportClients open={openImportDialog} setOpen={setOpenImportDialog} />
      <ClientFilter
        filters={filters}
        setFilters={setFilters}
        open={openFilter}
        setOpen={setOpenFilter}
      />
      <CustomizeColumns
        defaultColumns={_.cloneDeep(defaultColumns)}
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
    </>
  );
}

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

export default Clients;
