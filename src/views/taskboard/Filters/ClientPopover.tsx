import { Box, MenuItem, Popover, TextField, Typography } from "@mui/material";
import { addPin } from "api/services/tasks";
import useQueryParams from "hooks/useQueryParams";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface IProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  data: any;
}

function ClientPopover({ anchorEl, setAnchorEl, data }: IProps) {
  const { queryParams, setQueryParams } = useQueryParams();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const { mutate } = useMutation(addPin, {
    onSuccess: () => {
      setAnchorEl(null);
      queryClient.invalidateQueries("pins");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleClientFilter = (id: any) => {
    mutate({
      client: id,
    });
    setQueryParams({ ...queryParams, client: id });
  };

  const filteredData = data?.filter((item: any) => {
    return item?.displayName?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Popover
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      PaperProps={{
        elevation: 0,
        sx: {
          transform: "translateY(-10px)",
          minWidth: 200,
          minHeight: 100,
          maxHeight: 300,
        },
      }}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      <Box p={1} pt={2}>
        <TextField
          size="small"
          autoFocus
          placeholder="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Box>
      {filteredData?.map((item: any, index: number) => (
        <MenuItem
          selected={item?.id === +queryParams.client!}
          key={index}
          onClick={() => handleClientFilter(item.id)}
        >
          <Typography variant="body1" color="rgba(0,0,0,0.8)">
            {item?.displayName}
          </Typography>
        </MenuItem>
      ))}
    </Popover>
  );
}

export default ClientPopover;
