import { Add } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { icons } from "assets";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMilestone, addServiceState } from "redux/reducers/addServiceSlice";
import MilestoneItem from "./MilestoneItem";
import ReArrangeMilestones from "./RearrangMilestones";

function MileStones() {
  const dispatch = useDispatch();
  const { mileStones } = useSelector(addServiceState);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <Typography variant='subtitle2' color='primary'>
        Milestones
      </Typography>
      <Container sx={{ mt: 4 }}>
        <Box display='flex' justifyContent='flex-end'>
          <Button
            onClick={() => setOpen(true)}
            color='secondary'
            variant='contained'
            sx={{ minWidth: "30px", py: 1, px: 0, boxShadow: "none" }}>
            <img width={15} src={icons.shuffle} alt='' />
          </Button>
        </Box>
        {mileStones.map((item, index) => (
          <MilestoneItem item={item} key={index} index={index} />
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
      <ReArrangeMilestones open={open} setOpen={setOpen} />
    </Box>
  );
}

export default MileStones;
