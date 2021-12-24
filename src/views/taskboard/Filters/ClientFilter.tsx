import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box } from "@mui/material";
import { getClients } from "api/services/client";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import ClientPopover from "./ClientPopover";
import { StyledClientFilterItem, StyledMoreHorButton } from "./style";

function ClientFilter() {
  const { queryParams, setQueryParams } = useQueryParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: clients }: ResType = useQuery(["clients", {}], getClients);

  const handleClientFilter = (id: any) => {
    setQueryParams({ ...queryParams, client: id });
  };

  const client = queryParams.client;

  return (
    <>
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
        <StyledMoreHorButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreHorizIcon fontSize="small" />
        </StyledMoreHorButton>
      </Box>
      <ClientPopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        data={clients?.data[0]}
      />
    </>
  );
}

export default ClientFilter;
