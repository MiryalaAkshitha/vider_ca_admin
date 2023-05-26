import { Close } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Typography } from "@mui/material";
import { getClients } from "api/services/clients/clients";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType } from "components/Table";
import ValidateAccess from "components/ValidateAccess";
import { CLIENT_CATEGORIES } from "data/constants";
import { Permissions } from "data/permissons";
import useTitle from "hooks/useTitle";
import _ from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";
import Actions from "views/clients/Actions";
import AddClient from "views/clients/AddClient";
import CustomizeColumns from "views/clients/CustomizeColumns";
import ClientFilter from "views/clients/Filter";
import ImportClients from "views/clients/ImportClients";
import AppliedFilters from "views/tasks/Filters/ApplidedFilters";
import { StyledAppliedFilterItem } from "views/tasks/Filters/styles";
import { resetFilters } from "redux/reducers/taskboardSlice";
import { useDispatch } from "react-redux";

function Clients() {
  useTitle("Clients");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(10);
  const [openImportDialog, setOpenImportDialog] = useState<boolean>(false);
  const [openCustomColumns, setOpenCustomColumns] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [columns, setColumns] = useState(_.cloneDeep(defaultColumns));
  const [filters, setFilters] = useState({
    category: [],
    subCategory: [],
    monthAdded: "",
    labels: [],
    search: "",
  });

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, []);

  const { data, isLoading }: ResType = useQuery(
    [
      "clients",
      {
        limit: pageCount,
        offset: page * pageCount,
        query: {
          ...filters,
          category: filters.category.map((c: any) => c?.value),
          subCategory: filters.subCategory.map((c: any) => c?.value),
          labels: filters.labels.map((c: any) => c?.id),
        },
      },
    ],
    getClients, {
    onSuccess: (res: any) => {
      const result = partition(res?.data?.result, (el: any) => el.status === 'INACTIVE')
      setClients(result);
    }
  });

  const partition = (arr: any, condition: any) => {
    const actives = arr.filter((el: any) => condition(el));
    const inactives = arr.filter((el: any) => !condition(el));
    return [...inactives, ...actives];
  };

  const handleRowClick = (v: any) => {
    navigate(`/clients/${v?.id}/profile`);
  };

  const onRemoveFilter = (filterKey: any, filterItemIndex: any) => {
    const appliedFilters = JSON.parse(JSON.stringify(filters))[filterKey].filter(
      (item: any, index: number) => index !== filterItemIndex
    );
    setFilters({
      ...filters,
      [filterKey]: appliedFilters
    });
  }

  const customDatesLabel = (filter: string) => {
    let fromDate = filters[filter].fromDate;
    let toDate = filters[filter].toDate;

    return ` (${moment(fromDate).format("YYYY DD")}
             - ${moment(toDate).format("YYYY DD")})`;
  };

  const totalCount = data?.data?.count;

  const getfilterkeys = (filters: any) => {
    const obj = getfilterkeysObj(filters);
    return Object.keys(obj);
  }

  const getfilterkeysObj = (filters: any) => {
    const obj = JSON.parse(JSON.stringify(filters));
    delete obj?.search;
    delete obj?.monthAdded;
    return obj;
  }

  return (
    <Box px={3} pt={3}>
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
            placeHolder="Search by Display Name | Trade Name"
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
          {getfilterkeys(filters).map((filter, filterIndex: number) => {
            if (getfilterkeysObj(filters)[filter].length > 0) {
              return (
                <Box display="flex" gap={1} alignItems="center" key={filterIndex}>
                  <Typography variant="caption">{getTitle(filter)}:</Typography>
                  <Box display="flex" gap="4px" alignItems="center">
                    {getfilterkeysObj(filters)[filter].map(
                      (item: any, filterItemIndex: number) => (
                        <StyledAppliedFilterItem
                          onClick={() => {
                            onRemoveFilter(filter, filterItemIndex);
                          }}
                          key={filterItemIndex}
                        >
                          <Typography variant="body2">
                            {filter == 'monthAdded' ? item : item?.label}
                            {item?.label === "Custom" && customDatesLabel(filter)}
                            {filter == 'labels' && item?.name}
                          </Typography>
                          <Close sx={{ fontSize: "11px" }} />
                        </StyledAppliedFilterItem>
                      )
                    )}
                  </Box>
                </Box>
              );
            }
            return null;
          })}
        </Box>

        <Box display="flex" gap={2}>
          {selected.length > 0 && (
            <ValidateAccess name={[Permissions.DELETE_CLIENTS, Permissions.EDIT_CLIENTS]}>
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
          <ValidateAccess name={Permissions.CREATE_CLIENTS}>
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
      <Box sx={{ mt: 2 }}>
        <Table
          sx={{ mt: 3 }}
          loading={isLoading}
          onRowClick={handleRowClick}
          data={clients || []}
          columns={columns}
          selection={{ selected, setSelected }}
          pagination={{ totalCount, page, setPage, pageCount, setPageCount }}
        />
      </Box>
      <ValidateAccess name={Permissions.CREATE_CLIENTS}>
        <FloatingButton
          onClick={() => {
            setOpen(true);
          }}
        />
      </ValidateAccess>

      <AddClient open={open} setOpen={setOpen} />
      <ImportClients open={openImportDialog} setOpen={setOpenImportDialog} />
      <ClientFilter
        filters={filters}
        setFilters={setFilters}
        open={openFilter}
        setOpen={setOpenFilter}
      />
      <AppliedFilters />

      <CustomizeColumns
        defaultColumns={_.cloneDeep(defaultColumns)}
        columns={columns}
        setColumns={setColumns}
        open={openCustomColumns}
        setOpen={setOpenCustomColumns}
      />
      <Actions
        clearSelection={() => setSelected([])}
        selected={selected}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </Box>
  );
}

const defaultColumns: Array<ColumnType> = [
  { key: "clientId", title: "Client ID", default: true },
  { key: "displayName", title: "Display Name", default: true },
  { key: "tradeName", title: "Trade Name", hide: true },
  {
    key: "category",
    title: "Category",
    render: (rowData) => {
      return (
        <>
          {
            CLIENT_CATEGORIES.map((item: any) => {
              return item.value == rowData?.category ? item.label : '';
            })
          }
        </>
      )
    },
    default: true,
  },
  {
    key: "subCategory",
    title: "Sub Category",
    render: (rowData) => getTitle(rowData?.subCategory),
    default: true,
  },
  { key: "mobileNumber", title: "Mobile Number", default: true },
  { key: "email", title: "Email ID", default: true },
  { key: "panNumber", title: "PAN", hide: true },
  { key: "authorizedPerson", title: "Authorized Person", hide: true },
  {
    key: "active",
    title: "Status",
    default: true,
    render: (rowData) => {
      return (
        <div>
          {rowData.status === "ACTIVE" ? (
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
