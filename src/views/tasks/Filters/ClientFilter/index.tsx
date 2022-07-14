import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box } from "@mui/material";
import { getClients } from "api/services/clients/clients";
import { getPins } from "api/services/clients/client-pin";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { StyledClientFilterItem, StyledMoreHorButton } from "../styles";
import ClientFilterItem from "./ClientFilterItem";
import ClientPopover from "./ClientPopover";

function ClientFilter() {
  const { queryParams, setQueryParams } = useQueryParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const client = queryParams.client;

  const { data: clients }: ResType = useQuery(["clients", {}], getClients);

  const { data: pins }: ResType = useQuery(["pins"], getPins);

  return (
    <>
      <Box display="flex" gap="2px" flexWrap="wrap" alignItems="center">
        <StyledClientFilterItem
          mr={2}
          variant="body1"
          color="rgba(0,0,0,0.7)"
          onClick={() => setQueryParams({ ...queryParams, client: "" })}
          active={Boolean(client) === false ? 1 : 0}
        >
          All Clients
        </StyledClientFilterItem>
        {pins?.data?.map((item: any, index: number) => (
          <ClientFilterItem key={index} item={item} />
        ))}
        <StyledMoreHorButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreHorizIcon fontSize="small" />
        </StyledMoreHorButton>
      </Box>
      <ClientPopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        data={clients?.data?.result}
      />
    </>
  );
}

export default ClientFilter;
