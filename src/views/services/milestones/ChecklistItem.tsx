import { Delete } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  deleteMilestoneChecklistItem,
  updateChecklistItemName,
} from "redux/reducers/addServiceSlice";
import { StyledChecklistItem } from "./styles";

type CheckListItemProps = {
  item: string;
  index: number;
  cIndex: number;
};

const CheckListItem = ({ item, index, cIndex }: CheckListItemProps) => {
  const dispatch = useDispatch();

  const handleDeleteChecklistItem = () => {
    dispatch(
      deleteMilestoneChecklistItem({
        mIndex: index,
        cIndex,
      })
    );
  };

  const handleChecklistItemName = (value: string) => {
    dispatch(updateChecklistItemName({ index, cIndex, value }));
  };

  return (
    <StyledChecklistItem cIndex={cIndex}>
      <TextField
        onChange={(e) => handleChecklistItemName(e.target.value)}
        fullWidth
        sx={{ marginLeft: "40px" }}
        placeholder='Checklist item name'
        value={item}
        size='small'
      />
      <IconButton onClick={handleDeleteChecklistItem}>
        <Delete />
      </IconButton>
    </StyledChecklistItem>
  );
};

export default CheckListItem;
