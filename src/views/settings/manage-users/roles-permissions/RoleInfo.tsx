import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useState } from "react";
import EditRole from "views/settings/manage-users/roles-permissions/EditRole";

interface IProps {
  data: any;
}

function RoleInfo({ data }: IProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>({});

  return (
    <>
      <Box
        display="flex"
        gap={10}
        bgcolor="#FBF9F2"
        borderRadius={4}
        p={3}
        position="sticky"
        top={65}
        sx={{ zIndex: "1" }}
      >
        <Box>
          <Typography variant="body1" gutterBottom color="primary">
            Role Name
          </Typography>
          <Typography variant="body2" color="rgba(0,0,0,0.6)">
            {data?.name}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom color="primary">
            Created On
          </Typography>
          <Typography variant="body2" color="rgba(0,0,0,0.6)">
            {moment(data?.createdAt).format("YYYY-MM-DD")}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom color="primary">
            Status
          </Typography>
          <Typography variant="body2" color="rgba(0,0,0,0.6)">
            {data?.active ? "Active" : "Inactive"}
          </Typography>
        </Box>
        <Box flex={1} textAlign="right">
          <Button
            onClick={() => {
              setSelectedData(data);
              setOpen(true);
            }}
            color="secondary"
            variant="outlined"
          >
            Edit
          </Button>
        </Box>
      </Box>
      <EditRole open={open} setOpen={setOpen} data={selectedData} />
    </>
  );
}

export default RoleInfo;
