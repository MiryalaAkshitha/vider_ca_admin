import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";

function BottomBar() {

  const handleSaveASDraft = () => {

  };

  const handleSaveAndSend = () => {
    // navigate(`/invoicing/send-email`);

  }

  const PreviewPage = () => {
    // navigate(`/invoicing/preview`);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        zIndex: "100",
        width: "100%"
      }}
    >
      <Box
        p={2}
        mr={12}
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Button
            onClick={handleSaveASDraft}
            size="large"
            variant="contained"
            color="inherit"
          >
            Save as Draft
          </Button>
          <Button
            onClick={handleSaveAndSend}
            size="large"
            color="secondary"
            variant="contained"
            sx={{ marginLeft: "25px" }}
          >
            Save and send
          </Button>
        </Box>
        <Box>
          <Button size="large" color="secondary" onClick={PreviewPage}>
            Preview
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default BottomBar;
