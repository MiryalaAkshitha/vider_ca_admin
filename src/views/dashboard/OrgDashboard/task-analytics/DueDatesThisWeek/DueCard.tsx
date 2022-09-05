import EastIcon from "@mui/icons-material/East";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import Members from "components/Members";
import { colors } from "views/tasks/board/utils";

function DueCard({ dealine }: { dealine: any }) {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        marginBottom: "20px",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "10px",
      }}
    >
      <Box>
        <Box mb={2}>
          <Typography variant="caption" color="rgba(0,0,0,0.4)">
            {dealine.code}
          </Typography>
          <Typography variant="body2">{dealine.name}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: " 15px" }}>
          <Box>
            <Typography variant="caption" color="rgba(0,0,0,0.4)">
              Client Name
            </Typography>
            <Typography variant="body2">{dealine.client.name}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Typography variant="caption" color="rgba(0,0,0,0.4)">
              Members
            </Typography>
            <Members size="small" data={[1, 2, 3].map((member: any) => ({ src: "", title: "" }))} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box
          sx={{
            borderRadius: "20px",
            minWidth: "115px",
            padding: "5px 10px",
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            textAlign: "center",
          }}
        >
          <Typography color="white" variant="body2">
            {dealine.type}
          </Typography>
        </Box>
        <Box alignSelf="flex-end">
          <IconButton color="secondary" size="small">
            <EastIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default DueCard;
