import _ from "lodash";
import {
  Checkbox,
  CircularProgress,
  TablePagination,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, SystemStyleObject } from "@mui/system";
import React, { useState } from "react";
import { StyledTable, StyledTableLoader } from "./styles";

export type ColumnType = {
  key: string;
  title: string;
  render?: (item: any) => React.ReactElement | null;
  hide?: boolean;
};

type PaginationType = {
  totalCount: number;
  onPageCountChange?: (v: number) => void;
  pageCount: number;
  onChange: (v: number) => void;
};

type SelectionType = {
  all: boolean;
  selected: Array<number>;
  unselected: Array<number>;
  onSelect: (checked: boolean, v: any) => void;
  onSelectAll: (v: any) => void;
  toolbar?: React.ReactNode | null;
};

interface TableProps {
  columns: Array<ColumnType>;
  sx?: SystemStyleObject;
  data: any[];
  loading: boolean;
  onRowClick?: (v: any) => void;
  pagination?: PaginationType;
  selection?: SelectionType;
}

function Table(props: TableProps) {
  const {
    columns,
    data,
    sx,
    pagination,
    loading = false,
    onRowClick,
    selection,
  } = props;

  const [page, setPage] = useState(0);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    selection?.onSelectAll(e.target.checked);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
    e.stopPropagation();
    selection?.onSelect(e.target.checked, item);
  };

  const handleRowClick = (item: any) => {
    if (!onRowClick) return;
    onRowClick(item);
  };

  const checkIfSelected = (item: any): boolean => {
    if (selection?.all) {
      return _.findIndex(selection?.unselected, (v) => v === item.id) === -1;
    }
    return _.findIndex(selection?.selected, (v) => v === item.id) !== -1;
  };

  const showToolBar =
    selection && (selection?.all || selection?.selected?.length > 0);

  return (
    <Box
      sx={{
        position: "relative",
        boxShadow: "0px 0px 15px rgb(0 0 0 / 10%)",
        minHeight: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "6px",
        overflow: "hidden",
        border: "1px solid rgba(0, 0, 0, 0.09)",
        ...sx,
      }}
    >
      <div>
        {showToolBar && (
          <Toolbar
            sx={{
              background: (theme) => theme.palette.primary.light,
              justifyContent: "flex-end",
            }}
          >
            {selection.toolbar}
          </Toolbar>
        )}
        <StyledTable>
          <thead>
            <tr>
              {selection && data?.length > 0 && (
                <th style={{ width: 50 }}>
                  <Checkbox
                    color="secondary"
                    checked={selection.all}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((item, index) => {
                if (item.hide) return null;
                return <th key={index}>{item.title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {selection && (
                  <td>
                    <Checkbox
                      onChange={(e) => handleSelect(e, item)}
                      color="secondary"
                      checked={checkIfSelected(item)}
                    />
                  </td>
                )}
                {columns.map((col, colIndex) => {
                  if (col.hide) {
                    return null;
                  }
                  return (
                    <td key={colIndex} onClick={() => handleRowClick(item)}>
                      {col?.render ? (
                        col.render(item)
                      ) : (
                        <Typography variant="body2">
                          {_.get(item, col.key)}
                        </Typography>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </div>
      {pagination && (
        <Box px={2} mt={2} justifyContent="flex-end" display="flex">
          <TablePagination
            component="div"
            count={pagination.totalCount}
            page={page}
            onPageChange={(v, page) => {
              setPage(page);
              pagination.onChange(page);
            }}
            rowsPerPage={pagination.pageCount}
            onRowsPerPageChange={(e) => {
              if (pagination.onPageCountChange) {
                pagination.onPageCountChange(+e.target.value);
              }
            }}
          />
        </Box>
      )}
      {loading && (
        <StyledTableLoader>
          <CircularProgress color="primary" />
        </StyledTableLoader>
      )}
      {!loading && !data.length ? (
        <StyledTableLoader>
          <Typography variant="subtitle2" color="rgba(0,0,0,0.5)">
            No data
          </Typography>
        </StyledTableLoader>
      ) : null}
    </Box>
  );
}

export default Table;
