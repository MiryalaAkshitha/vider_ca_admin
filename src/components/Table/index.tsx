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
  render?: (item: any) => React.ReactElement | string | null;
  hide?: boolean;
};

type PaginationType = {
  totalCount: number;
  onPageCountChange?: (v: number) => void;
  pageCount: number;
  onChange: (v: number) => void;
};

type SelectionType = {
  toolbar: (selected: any) => React.ReactNode | null;
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
  const [selected, setSelected] = useState<any>({});

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected({
        ...selected,
        [page]: data,
      });
    } else {
      setSelected({
        ...selected,
        [page]: [],
      });
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelected({
        ...selected,
        [page]: [...(selected[page] || []), item],
      });
    } else {
      setSelected({
        ...selected,
        [page]: _.without(selected[page], item),
      });
    }
  };

  const handleRowClick = (item: any) => {
    if (!onRowClick) return;
    onRowClick(item);
  };

  const showToolBar = selected[page] && selected[page].length > 0;

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
              background: "rgba(24, 47, 83, 0.2)",
              justifyContent: "flex-end",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
            }}
          >
            {selection!.toolbar(selected[page])}
          </Toolbar>
        )}
        <StyledTable>
          <thead>
            <tr>
              {selection && data?.length > 0 && (
                <th style={{ width: 50 }}>
                  <Checkbox
                    color="secondary"
                    onChange={handleSelectAll}
                    checked={selected[page]?.length === data?.length}
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
                  <>
                    <td>
                      <Checkbox
                        onChange={(e) => handleSelect(e, item)}
                        color="secondary"
                        checked={Boolean(
                          selected[page]?.find((v: any) => v.id === item.id)
                        )}
                      />
                    </td>
                  </>
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
            count={pagination.totalCount || 10}
            page={page}
            onPageChange={(v, page) => {
              setPage(page);
              pagination.onChange(page);
            }}
            rowsPerPageOptions={[5, 10, 20]}
            rowsPerPage={pagination.pageCount || 10}
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
