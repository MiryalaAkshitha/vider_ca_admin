import { Box, Paper, Typography } from "@mui/material";

interface Props {
  img: any;
  title: string;
  value: string;
}

const TasksCard = ({ img, title, value }: Props) => {
  return (
    <Paper sx={{ padding: "25px" }}>
      <Box display="flex" gap={2} alignItems="center">
        <div>
          <img src={img} alt="" width="50px" />
        </div>
        <Box flex={1}>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="h5">{value}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
export default TasksCard;
