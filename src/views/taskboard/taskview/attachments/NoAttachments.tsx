import { Box, Button, Typography } from "@mui/material";
import { noAttachments } from "assets";

type Props = {
  action: () => void;
};

function NoAttachments({ action }: Props) {
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
          Have something to attach?
        </Typography>
        <Typography variant="body2">
          Attach task related files here for other members in the team to view
          or download
        </Typography>
        <Button
          onClick={action}
          sx={{ mt: 3 }}
          variant="outlined"
          color="secondary"
        >
          Add Attachment
        </Button>
      </div>
    </Box>
  );
}

export default NoAttachments;
