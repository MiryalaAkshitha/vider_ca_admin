import { MoreVert } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { deleteMilestone, updateMilestone } from "api/services/tasks";
import { snack } from "components/toast";
import { useMenu } from "context/MenuPopover";
import { FocusEvent, MouseEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditMilestone from "./EditMilestone";

interface Props {
  data: any;
  index: number;
  disabled?: boolean;
}

function Milestone({ data, index, disabled = false }: Props) {
  const queryClient = useQueryClient();
  const menu = useMenu();
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation(deleteMilestone, {
    onSuccess: () => {
      snack.success("Milestone deleted");
      queryClient.invalidateQueries("milestones");
      setOpen(false);
    },
  });

  const { mutate: update } = useMutation(updateMilestone, {
    onSuccess: () => {
      snack.success("Milestone updated");
      queryClient.invalidateQueries("milestones");
      setOpen(false);
    },
  });

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
            mutate(data?.id);
          },
        },
      ],
    });
  };

  const handleComplete = () => {
    update({
      id: data?.id,
      data: {
        ...data,
        status: data?.status === "DONE" ? "PENDING" : "DONE",
      },
    });
  };

  const handleUpdate = (e: FocusEvent<HTMLInputElement>) => {
    if (data?.referenceNumberValue === e.target.value) return;
    update({
      id: data?.id,
      data: {
        ...data,
        referenceNumberValue: e.target.value,
      },
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
            onClick={handleComplete}
            sx={{
              color: data?.status === "DONE" ? "#07bc0c" : "rgba(0,0,0,0.2)",
              mt: "5px",
              cursor: "pointer",
            }}
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
              defaultValue={data?.referenceNumberValue || ""}
              onBlur={handleUpdate}
              placeholder="Reference number"
            />
          </Box>
        )}
      </Box>
      <EditMilestone open={open} setOpen={setOpen} data={data} />
    </>
  );
}

export default Milestone;
