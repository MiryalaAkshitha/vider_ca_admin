import { Box, Button, Typography } from "@mui/material";
import { noSubTasks } from "assets";

type Props = {
  action: () => void;
};

function NoLogHours({ action }: Props) {
  return (
    <Box
      px={2}
      py={10}
      justifyContent="center"
      maxWidth={500}
      mx="auto"
      display="flex"
      gap={4}
      alignItems="center"
    >
      <div>
        <img src={noSubTasks} alt="" />
      </div>
      <div>
        <Typography variant="subtitle2" gutterBottom>
          Add log hour in your task
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
          Add Log Hour
        </Button>
      </div>
    </Box>
  );
}

export default NoLogHours;
