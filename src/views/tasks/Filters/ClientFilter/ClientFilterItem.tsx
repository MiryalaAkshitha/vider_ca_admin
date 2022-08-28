import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Menu, MenuItem } from "@mui/material";
import { removePin } from "api/services/clients/client-pin";
import { snack } from "components/toast";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { StyledClientFilterItem } from "../styles";
import EllipsisText from "react-ellipsis-text";

interface Props {
  item: any;
}

const ClientFilterItem = ({ item }: Props) => {
  const queryClient = useQueryClient();
  const { queryParams, setQueryParams } = useQueryParams();
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const client = queryParams.client;

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
          onClick={() => setQueryParams({ ...queryParams, client: item?.client?.id })}
          variant="body1"
          color="rgba(0,0,0,0.7)"
          active={item?.client?.id === +client! ? 1 : 0}
        >
          {item?.client?.displayName?.slice(0, 18)}{" "}
          {item?.client?.displayName?.length > 20 && "..."}
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

export default ClientFilterItem;
