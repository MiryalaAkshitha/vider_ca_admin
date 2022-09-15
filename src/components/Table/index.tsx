import { Checkbox, CircularProgress, TablePagination, Typography } from "@mui/material";
import { Box, SystemStyleObject } from "@mui/system";
import _ from "lodash";
import React from "react";
import { StyledTable, StyledTableContainer, StyledTableLoader } from "./styles";

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 25, 50];

export type ColumnType = {
  key: string;
  title: string;
  render?: (item: any) => React.ReactElement | string | null;
  hide?: boolean;
  default?: boolean;
  width?: string;
};

type PaginationType = {
  totalCount: number;
  page: number;
  setPage: (page: number) => void;
  pageCount?: number;
  setPageCount?: (pageCount: number) => void;
};

type SelectionType = {
  selected: any[];
  setSelected: (selected: any[]) => void;
};

interface TableProps {
  columns: Array<ColumnType>;
  sx?: SystemStyleObject;
  data: any[];
  loading?: boolean;
  onRowClick?: (v: any) => void;
  pagination?: PaginationType;
  selection?: SelectionType;
}

function Table(props: TableProps) {
  const { columns, data = [], sx, pagination, loading = false, onRowClick, selection } = props;

  const { selected, setSelected } = selection || {
    selected: [],
    setSelected: () => {},
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(data);
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelected([...selected, item]);
    } else {
      const filtered = selected?.filter((v: any) => v?.id !== item?.id);
      setSelected(filtered);
    }
  };

  const handleRowClick = (item: any) => {
    if (!onRowClick) return;
    onRowClick(item);
  };

  const handlePageChange = (v: any, page: number) => {
    pagination?.setPage(page);
    setSelected([]);
  };

  const handleRowsPerPageChange = (e: any) => {
    if (pagination?.setPageCount) {
      pagination?.setPage(0);
      pagination?.setPageCount(+e.target.value);
      setSelected([]);
    }
  };

  return (
    <StyledTableContainer sx={sx}>
      <div style={{ height: "400px", overflow: "scroll" }}>
        <StyledTable>
          <thead>
            <tr>
              {selection && data?.length > 0 && (
                <th style={{ width: 50 }}>
                  <Checkbox
                    color="secondary"
                    onChange={handleSelectAll}
                    checked={selected?.length === data?.length}
                  />
                </th>
              )}
              {columns.map((item, index) => {
                if (item.hide) return null;
                return (
                  <th key={index} style={{ width: item.width || "auto" }}>
                    {item.title}
                  </th>
                );
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
                      checked={Boolean(_.find(selected, { id: item?.id }))}
                    />
                  </td>
                )}
                {columns.map((col, colIndex) => {
                  if (col.hide) return null;
                  return (
                    <td key={colIndex} onClick={() => handleRowClick(item)}>
                      {col?.render ? (
                        col.render(item)
                      ) : (
                        <Typography variant="body2">{_.get(item, col.key)}</Typography>
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
        <Box px={2} justifyContent="flex-end" display="flex">
          <TablePagination
            component="div"
            count={pagination.totalCount || 10}
            page={pagination.page || 0}
            onPageChange={handlePageChange}
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            rowsPerPage={pagination.pageCount || 10}
            onRowsPerPageChange={handleRowsPerPageChange}
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
    </StyledTableContainer>
  );
}

export default Table;
