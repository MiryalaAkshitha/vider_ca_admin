import { Button, Menu, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getNotifications } from "api/services/notifications";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import DateFilter from "./DateFilter";
import NotificationItem from "./NotificationItem";

function Notifications({ anchorEl, setAnchorEl }) {
  const open = Boolean(anchorEl);
  const [filters, setFilters] = useState({ fromDate: null, toDate: null });

  const { data, isLoading }: ResType = useQuery(
    ["notifications", filters],
    getNotifications,
    {
      enabled: Boolean(anchorEl),
    }
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 600,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          borderBottom: "3px solid #F5F5F5",
        }}
      >
        <Typography variant="subtitle2">Notifications</Typography>
        <Button
          sx={{ minWidth: 50 }}
          size="small"
          onClick={(e) => handleClose()}
        >
          Close
        </Button>
      </Box>
      <Box>
        <DateFilter filters={filters} setFilters={setFilters} />
        {isLoading ? (
          <Loader minHeight="200px" />
        ) : (
          <Box p={2} sx={{ maxHeight: 400, overflowY: "auto" }}>
            {data?.data?.map((item: any, index: number) => {
              return <NotificationItem data={item} key={index} />;
            })}
          </Box>
        )}
      </Box>
    </Menu>
  );
}

export default Notifications;
