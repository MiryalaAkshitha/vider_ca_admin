import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { getClients } from "api/services/client";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useQuery } from "react-query";
import { DataResType } from "types/createTask.types";
import { StyledClientFilterItem } from "./style";

function Filters() {
  const { queryParams, setQueryParams } = useQueryParams();
  const { data: clients }: DataResType = useQuery(["clients", {}], getClients);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const client = queryParams.client;

  const handleClientFilter = (id: any) => {
    setQueryParams({ ...queryParams, client: id });
  };

  return (
    <Box
      sx={{
        background: "#F5F5F5",
        marginLeft: "-16px",
        marginRight: "-16px",
        marginTop: "-16px",
        p: 2,
      }}
    >
      <Box display="flex" gap="15px" flexWrap="wrap" alignItems="center">
        <StyledClientFilterItem
          variant="body1"
          color="rgba(0,0,0,0.7)"
          onClick={() => handleClientFilter("")}
          active={!client}
        >
          All Clients
        </StyledClientFilterItem>
        {clients?.data[0]?.slice(0, 4)?.map((item: any, index: number) => (
          <StyledClientFilterItem
            key={index}
            onClick={() => handleClientFilter(item.id)}
            variant="body1"
            color="rgba(0,0,0,0.7)"
            active={item?.id === +client!}
          >
            {item?.displayName}
          </StyledClientFilterItem>
        ))}
        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            background: "white",
            minWidth: 0,
            p: 0,
            px: 1,
            height: "20px",
            border: "1px solid lightgrey",
            color: "rgba(0,0,0,0.5)",
          }}
        >
          <MoreHorizIcon fontSize="small" />
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={() => setAnchorEl(null)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            transform: "translateY(-10px)",
            minWidth: 200,
            height: 300,
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {clients?.data[0]?.map((item: any, index: number) => (
          <MenuItem
            selected={item?.id === +client!}
            key={index}
            onClick={() => handleClientFilter(item.id)}
          >
            <Typography variant="body1" color="rgba(0,0,0,0.8)">
              {item?.displayName}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default Filters;
