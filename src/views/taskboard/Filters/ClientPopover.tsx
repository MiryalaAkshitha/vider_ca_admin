import { Menu, MenuItem, Typography } from "@mui/material";
import useQueryParams from "hooks/useQueryParams";

interface IProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  data: any;
}

function ClientPopover({ anchorEl, setAnchorEl, data }: IProps) {
  const { queryParams, setQueryParams } = useQueryParams();

  const handleClientFilter = (id: any) => {
    setQueryParams({ ...queryParams, client: id });
  };

  return (
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
      {data?.map((item: any, index: number) => (
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
    </Menu>
  );
}

export default ClientPopover;
