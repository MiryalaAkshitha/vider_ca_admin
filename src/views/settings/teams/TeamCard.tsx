import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { MouseEvent, useState } from "react";
import EditTeamPopover from "./EditTeamPopover";

type Props = {
  data: any;
};

function TeamCard({ data }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box
        sx={{
          boxShadow: "0px 3px 12px #0000001A",
          borderRadius: 2,
        }}
      >
        <Box display="flex" p={2} gap={1} justifyContent="space-between">
          <Box display="flex" gap="4px">
            <Typography variant="subtitle2" color="primary">
              {data?.name}
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            {data?.members?.length ? (
              <IconButton onClick={() => setOpen(!open)}>
                <KeyboardArrowDownRoundedIcon />
              </IconButton>
            ) : null}
            <IconButton onClick={handleClick}>
              <MoreVertRounded />
            </IconButton>
          </Box>
        </Box>
        {data?.members?.length && open ? (
          <>
            <Divider sx={{ my: 1 }} />
            <Box flexWrap="wrap" display="flex" p={2} gap={2}>
              {data?.members?.map((item: any, index: any) => (
                <Box
                  px="10px"
                  py="5px"
                  borderRadius={2}
                  key={index}
                  border="1px solid rgb(24, 47, 83, 0.2)"
                >
                  <Typography color="primary" variant="caption">
                    {item?.fullName}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        ) : null}
      </Box>
      <EditTeamPopover
        data={data}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
}

export default TeamCard;
