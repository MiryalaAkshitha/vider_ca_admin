import { MoreVertRounded } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditTeamPopover from "./EditTeamPopover";

function TeamCard({ data }: any) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <Box
        sx={{
          boxShadow: "0px 3px 12px #0000001A",
          borderRadius: 2,
          p: 2,
          cursor: "pointer",
        }}
        onClick={() => navigate(`/settings/teams/${data.id}`)}
      >
        <Box display="flex" gap={1}>
          <Typography sx={{ flex: 1 }} variant="subtitle2" mb={2}>
            {data?.name}
          </Typography>
          <div>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
            >
              <MoreVertRounded />
            </IconButton>
          </div>
        </Box>
        <Box flexWrap="wrap" display="flex" gap={2}>
          {data?.tags?.map((item: any, index: any) => (
            <Box
              px="10px"
              py="2px"
              borderRadius={2}
              key={index}
              border="1px solid rgb(24, 47, 83, 0.2)"
            >
              <Typography color="primary" variant="caption">
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
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
