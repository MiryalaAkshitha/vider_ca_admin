import { MoreVert } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { useMenu } from "context/MenuPopover";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteChecklistItem } from "redux/reducers/addServiceSlice";
import { StyledChecklistItem } from "./styles";
import UpdateChecklistItem from "./UpdateChecklistItem";

interface Props {
  data: any;
  checklistIndex: number;
  index: number;
}

const CheckListItem = ({ data, checklistIndex, index }: Props) => {
  const dispatch = useDispatch();
  const menu = useMenu();
  const [open, setOpen] = useState<boolean>(false);

  const handleMenu = (e: any) => {
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => setOpen(true),
        },
        {
          label: "Delete",
          action: () => {
            dispatch(
              deleteChecklistItem({
                checklistIndex,
                itemIndex: index,
              })
            );
          },
        },
      ],
    });
  };

  return (
    <>
      <StyledChecklistItem
        bgcolor={(index + 1) % 2 === 1 ? "#FAFAFA" : "white"}
      >
        <Grid container sx={{ flex: 1 }}>
          <Grid item xs={5}>
            <Typography variant="body1">{data.name}</Typography>
          </Grid>
          <Grid item xs={5}>
            <div>
              <Typography variant="body2">{data?.description}</Typography>
            </div>
          </Grid>
        </Grid>
        <div>
          <IconButton onClick={handleMenu}>
            <MoreVert />
          </IconButton>
        </div>
      </StyledChecklistItem>
      <UpdateChecklistItem
        open={open}
        setOpen={setOpen}
        data={data}
        checklistIndex={checklistIndex}
        index={index}
      />
    </>
  );
};

export default CheckListItem;
