import { Add } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addMilestone, addServiceState } from "redux/reducers/addServiceSlice";
import MilestoneItem from "./MilestoneItem";

function MileStones() {
  const dispatch = useDispatch();
  const { mileStones } = useSelector(addServiceState);

  return (
    <Box>
      <Typography variant='subtitle2' color='primary'>
        Milestones
      </Typography>
      <Container sx={{ mt: 4 }}>
        {mileStones.map((item, index) => (
          <MilestoneItem item={item} index={index} />
        ))}
        <Box mt={5} textAlign='right'>
          <Button
            onClick={() => dispatch(addMilestone())}
            startIcon={<Add />}
            variant='outlined'
            color='secondary'>
            Add Milestone
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default MileStones;
