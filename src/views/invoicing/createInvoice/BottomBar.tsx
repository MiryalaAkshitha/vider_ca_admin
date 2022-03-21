import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";

function BottomBar() {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: "100",
      }}
    >
      <Box
        maxWidth={1500}
        margin="auto"
        p={2}
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Button size="large" color="secondary" variant="contained">
            Save and send
          </Button>
        </Box>
        <Box>
          <Button size="large" color="secondary">
            Preview
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default BottomBar;
