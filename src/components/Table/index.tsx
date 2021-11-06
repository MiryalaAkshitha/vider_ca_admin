import { CircularProgress, Pagination, Typography } from "@mui/material";
import { Box, SystemStyleObject } from "@mui/system";
import _ from "lodash";
import React, { useState } from "react";
import { StyledTable, StyledTableLoader } from "./styles";

interface TableProps {
  columns: Array<{
    key: string;
    title: string;
    render?: (item: any) => React.ReactElement | null;
  }>;
  sx?: SystemStyleObject;
  data: any[];
  loading: boolean;
  onRowClick?: (v: any) => void;
  pagination?: {
    totalCount: number;
    pageCount: number;
    onChange: (v: number) => void;
  };
}

function Table({
  columns,
  data,
  sx,
  pagination,
  loading = false,
  onRowClick,
}: TableProps) {
  const [page, setPage] = useState(1);

  const handleRowClick = (item: any) => {
    if (!onRowClick) return;
    onRowClick(item);
  };

  if (!data.length) return null;

  return (
    <Box
      sx={{
        position: "relative",
        boxShadow: "0px 0px 15px rgb(0 0 0 / 10%)",
        pb: 3,
        minHeight: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "6px",
        overflow: "hidden",
        ...sx,
      }}
    >
      <StyledTable>
        <thead>
          {columns.map((item, index) => (
            <th key={index}>{item.title}</th>
          ))}
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => handleRowClick(item)}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col?.render ? (
                    col.render(item)
                  ) : (
                    <Typography variant="body2">
                      {_.get(item, col.key)}
                    </Typography>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {pagination && (
        <Box px={2} mt={2} justifyContent="flex-end" display="flex">
          <Pagination
            color="secondary"
            page={page}
            count={Math.ceil(pagination.totalCount / pagination.pageCount)}
            variant="outlined"
            onChange={(v, page) => {
              setPage(page);
              pagination.onChange(page);
            }}
          />
        </Box>
      )}
      {loading && (
        <StyledTableLoader>
          <CircularProgress color="primary" />
        </StyledTableLoader>
      )}
    </Box>
  );
}

export default Table;
