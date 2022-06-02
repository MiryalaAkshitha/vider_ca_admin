import { MoreVert } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { http } from "api/http";
import { deleteStageOfWork, updateStageOfWork } from "api/services/tasks";
import { snack } from "components/toast";
import { useMenu } from "context/MenuPopover";
import { FocusEvent, MouseEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { InputChangeType } from "types";
import EditStageOfWork from "./EditStageOfWork";

function Stage({ data, index }: any) {
  const queryClient = useQueryClient();
  const menu = useMenu();
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation(deleteStageOfWork, {
    onSuccess: () => {
      snack.success("Stage of work deleted");
      queryClient.invalidateQueries("stage-of-work");
      setOpen(false);
    },
  });

  const { mutate: update } = useMutation(updateStageOfWork, {
    onSuccess: () => {
      snack.success("Stage of work updated");
      queryClient.invalidateQueries("stage-of-work");
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

  const handleAttributeUpdate = (index: number, e: any) => {
    const extraAttributes = data?.extraAttributes;
    extraAttributes[index].value = e.target.value;
    update({
      id: data?.id,
      data: {
        ...data,
        extraAttributes,
      },
    });
  };

  const handleAttachmentUpdate = async (index: number, e: any) => {
    let file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    const res: any = await http.post("/common/upload", formData);

    const extraAttributes = data?.extraAttributes;
    extraAttributes[index].value = {
      name: file.name,
      url: res.data.Location,
    };

    update({
      id: data?.id,
      data: {
        ...data,
        extraAttributes,
      },
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
        <Box display="flex" gap={1} alignItems="center">
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
        {data.type === "STAGE_OF_WORK" && data.referenceNumber && (
          <Box mt={2}>
            <TextField
              sx={{ background: "white", width: "80%" }}
              variant="outlined"
              defaultValue={data?.referenceNumberValue || ""}
              onBlur={handleUpdate}
              size="small"
              placeholder="Reference number"
            />
          </Box>
        )}
        {data.type === "DELIVERABLES" && (
          <>
            {data.extraAttributes.map((v: any, index: number) => {
              if (v.type === "Reference Number") {
                return (
                  <Box mt={2}>
                    <TextField
                      defaultValue={v?.value || ""}
                      onBlur={(e) => handleAttributeUpdate(index, e)}
                      sx={{ background: "white", width: "80%" }}
                      variant="outlined"
                      size="small"
                      placeholder="Reference number"
                    />
                  </Box>
                );
              }
              return (
                <>
                  <label
                    htmlFor={v?.id + v?.title}
                    style={{ cursor: "pointer" }}
                  >
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
                        Upload {v.title}
                      </Typography>
                      {v?.value && (
                        <a href={v?.value?.url} target="_blank">
                          <Typography variant="body2">
                            {v?.value?.name}
                          </Typography>
                        </a>
                      )}
                    </Box>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleAttachmentUpdate(index, e)}
                    id={v?.id + v?.title}
                    style={{ display: "none" }}
                  />
                </>
              );
            })}
          </>
        )}
      </Box>
      <EditStageOfWork open={open} setOpen={setOpen} data={data} />
    </>
  );
}

export default Stage;
