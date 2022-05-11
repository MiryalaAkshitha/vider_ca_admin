import { Button, Dialog, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { useDispatch, useSelector } from "react-redux";
import {
  addServiceState,
  reArrangeMilestones,
} from "redux/reducers/addServiceSlice";
import { DialogProps } from "types";
import DraggableMilestone from "./DraggableMilestone";

function RearrangeMilestones({ open, setOpen }: DialogProps) {
  const dispatch = useDispatch();
  const { mileStones } = useSelector(addServiceState);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = mileStones[dragIndex];
      dispatch(
        reArrangeMilestones(
          update(mileStones, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          })
        )
      );
    },
    [dispatch, mileStones]
  );

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { px: 2, pt: 3, pb: 1, minHeight: 100 } }}
      open={open}
    >
      <Typography
        color="primary"
        sx={{ mb: 3 }}
        variant="subtitle1"
        gutterBottom
      >
        Re-arrange Milestones
      </Typography>
      <DndProvider backend={HTML5Backend}>
        {mileStones.map((item, index) => (
          <DraggableMilestone
            key={item.id}
            index={index}
            id={item.id}
            text={item.name}
            moveCard={moveCard}
          />
        ))}
      </DndProvider>
      <Box textAlign="right" mt={2}>
        <Button
          onClick={() => setOpen(false)}
          variant="outlined"
          color="secondary"
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
}

export default RearrangeMilestones;
