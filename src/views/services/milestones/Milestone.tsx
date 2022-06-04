import { MoreVert } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useMenu } from "context/MenuPopover";
import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMilestone } from "redux/reducers/addServiceSlice";
import EditMilestone from "views/services/Milestones/EditMilestone";

interface Props {
  data: any;
  index: number;
  disabled?: boolean;
}

function Milestone({ data, index, disabled = false }: Props) {
  const dispatch = useDispatch();
  const menu = useMenu();
  const [open, setOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
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
            dispatch(deleteMilestone(index));
          },
        },
      ],
    });
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100px",
          background: "#F6F5FF",
          padding: "10px 10px 10px 10px",
          borderRadius: 3,
          border: "1px solid #EFE5C2",
        }}
      >
        <Box display="flex" gap={1}>
          <CheckCircleOutlineIcon
            fontSize="medium"
            sx={{ color: "rgba(0,0,0,0.2)", mt: "5px" }}
          />
          <Box flex={1}>
            <Typography variant="subtitle2">
              {index + 1}. {data?.name}
            </Typography>
          </Box>
          <div>
            <IconButton size="small" onClick={handleClick}>
              <MoreVert />
            </IconButton>
          </div>
        </Box>
        <Box mt={1}>
          <Typography variant="body2" color="rgba(0,0,0,0.6)">
            {data?.description}
          </Typography>
        </Box>
        {data.referenceNumber && (
          <Box mt={2}>
            <TextField
              disabled={disabled}
              sx={{ background: "white", width: "80%" }}
              variant="outlined"
              size="small"
              placeholder="Reference number"
            />
          </Box>
        )}
      </Box>
      <EditMilestone open={open} setOpen={setOpen} data={data} index={index} />
    </>
  );
}

export default Milestone;
