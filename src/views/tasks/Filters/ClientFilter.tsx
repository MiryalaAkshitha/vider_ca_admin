import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Menu, MenuItem } from "@mui/material";
import { getClients } from "api/services/client";
import { getPins, removePin } from "api/services/tasks";
import useQueryParams from "hooks/useQueryParams";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import ClientPopover from "./ClientPopover";
import { StyledClientFilterItem, StyledMoreHorButton } from "./style";

function ClientFilter() {
  const { queryParams, setQueryParams } = useQueryParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: clients }: ResType = useQuery(["clients", {}], getClients);
  const { data: pins }: ResType = useQuery(["pins"], getPins);

  const client = queryParams.client;

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

const ClientFilterItem = ({ item }) => {
  const { queryParams, setQueryParams } = useQueryParams();
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(removePin, {
    onSuccess: () => {
      setAnchorEl(null);
      queryClient.invalidateQueries("pins");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleRemove = () => {
    mutate(item?.id);
    if (item?.client?.id === +client) {
      setQueryParams({ ...queryParams, client: "" });
    }
  };

  const client = queryParams.client;

  return (
    <>
      <Box
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <StyledClientFilterItem
          onClick={() =>
            setQueryParams({ ...queryParams, client: item?.client?.id })
          }
          variant="body1"
          color="rgba(0,0,0,0.7)"
          active={item?.client?.id === +client! ? 1 : 0}
        >
          {item?.client?.displayName}
        </StyledClientFilterItem>
        <ArrowDropDownIcon
          onClick={(e: any) => setAnchorEl(e.currentTarget)}
          sx={{
            mt: "3px",
            opacity: show ? 1 : 0,
            transition: "0.2s",
            cursor: "pointer",
          }}
        />
      </Box>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem selected={false} onClick={handleRemove}>
          Remove
        </MenuItem>
      </Menu>
    </>
  );
};

export default ClientFilter;
