import { MoreVert } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useMenu } from "context/MenuPopover";
import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteStageOfWork } from "redux/reducers/addServiceSlice";
import EditStageOfWork from "./EditStageOfWork";

function Stage({ data, index }: any) {
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
            dispatch(deleteStageOfWork(index));
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
          background: "#FBF9F2",
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
        {data.type === "Stage of work" && data.referenceNumber && (
          <Box mt={2}>
            <TextField
              disabled
              sx={{ background: "white", width: "80%" }}
              variant="outlined"
              size="small"
              placeholder="Reference number"
            />
          </Box>
        )}
        {data.type === "Deliverables" && (
          <>
            {data.extraAttributes.map((v: any) => {
              if (v.type === "Reference Number") {
                return (
                  <Box mt={2}>
                    <TextField
                      disabled
                      sx={{ background: "white", width: "80%" }}
                      variant="outlined"
                      size="small"
                      placeholder="Reference number"
                    />
                  </Box>
                );
              }
              return (
                <Box
                  mt={2}
                  sx={{
                    border: "1px dashed rgba(0,0,0,0.4)",
                    borderRadius: 2,
                    p: 2,
                    textAlign: "center",
                    width: "80%",
                  }}
                >
                  <Typography variant="body2" color="rgba(0,0,0,0.6)">
                    {v.title}
                  </Typography>
                </Box>
              );
            })}
          </>
        )}
      </Box>
      <EditStageOfWork
        open={open}
        setOpen={setOpen}
        data={data}
        index={index}
      />
    </>
  );
}

export default Stage;
