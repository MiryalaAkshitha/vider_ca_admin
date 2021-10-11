import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  addMilestoneChecklistItem,
  deleteMilestone,
  updateMilestoneName,
} from "redux/reducers/addServiceSlice";
import CheckListItem from "./ChecklistItem";

type MilestoneProps = {
  item: {
    name: string;
    checklist: Array<string>;
  };
  index: number;
};

function MilestoneItem(props: MilestoneProps) {
  const { index, item } = props;
  const dispatch = useDispatch();

  const handleMilestoneName = (index: number, value: string) => {
    dispatch(updateMilestoneName({ index, value }));
  };

  return (
    <Box mt={3} key={index}>
      <Box alignItems='center' display='flex' justifyContent='space-between'>
        <Typography mb={1} variant='body2' color='primary'>
          {`Milestone ${index + 1}`}
        </Typography>
        <IconButton onClick={() => dispatch(deleteMilestone(index))}>
          <Delete />
        </IconButton>
      </Box>
      <TextField
        onChange={(e) => handleMilestoneName(index, e.target.value)}
        fullWidth
        placeholder='Milestone name'
        value={item.name}
        size='small'
      />
      <Box pl={4}>
        {item.checklist.map((item: string, cIndex: number) => (
          <CheckListItem item={item} index={index} cIndex={cIndex} />
        ))}
      </Box>
      <Button
        sx={{ mt: 1 }}
        size='small'
        onClick={() => {
          dispatch(addMilestoneChecklistItem(index));
        }}
        startIcon={<Add />}
        color='secondary'>
        Add checklist item
      </Button>
    </Box>
  );
}

export default MilestoneItem;
