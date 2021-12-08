import { Box, Button, Typography } from "@mui/material";
import { noAttachments } from "assets";

function NoAttachments({ action }: { action: () => void }) {
  return (
    <Box
      px={2}
      py={10}
      justifyContent="center"
      maxWidth={500}
      mx="auto"
      display="flex"
      gap={2}
      alignItems="center"
    >
      <div>
        <img src={noAttachments} alt="" />
      </div>
      <div>
        <Typography variant="subtitle2" gutterBottom>
          Add a Sub item in your task
        </Typography>
        <Typography variant="body2">
          Divide your task into smaller items and add them here
        </Typography>
        <Button
          onClick={action}
          sx={{ mt: 3 }}
          variant="outlined"
          color="secondary"
        >
          Add Sub Task
        </Button>
      </div>
    </Box>
  );
}

export default NoAttachments;
