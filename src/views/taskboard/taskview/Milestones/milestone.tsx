import { MoreVert } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, IconButton, Typography } from "@mui/material";

type Props = {
  data: any;
  index: number;
};

function MileStone({ data, index }: Props) {
  return (
    <Box
      sx={{
        minWidth: 300,
        background: "#FBF9F2",
        padding: "10px 10px 10px 10px",
        borderRadius: 3,
        border: "1px solid #EFE5C2",
      }}
    >
      <Box display="flex">
        <Box flex={1}>
          <Typography variant="h6">
            {index + 1}. {data.name}
          </Typography>
        </Box>
        <div>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </Box>
      <Box mt={1} display="flex" alignItems="center">
        <Box flex={1}>
          <Typography variant="body2" color="rgba(0,0,0,0.6)">
            {data?.checklistItems?.length} Checklist Items
          </Typography>
        </Box>
        {data?.status === "done" ? (
          <CheckCircleIcon fontSize="large" sx={{ color: "#89B152" }} />
        ) : (
          <CheckCircleOutlineIcon
            fontSize="large"
            sx={{ color: "rgba(0,0,0,0.2)" }}
          />
        )}
      </Box>
    </Box>
  );
}

export default MileStone;
