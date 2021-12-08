import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTaskAttachments } from "api/tasks";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { DataResponseType } from "types/createTask.types";
import NoAttachments from "./NoAttachments";
import UploadAttachmentModal from "./UploadAttachmentModal";

function Attachments() {
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: DataResponseType = useQuery(
    ["task-attachments", params.taskId],
    getTaskAttachments,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loader />;
  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Attachments
        </Typography>
        {data?.data?.length ? (
          <Button color="secondary" variant="outlined">
            Add Attachment
          </Button>
        ) : null}
      </Box>
      <Box>
        {data?.data?.length ? (
          data?.data?.map((comment: any, index: number) => <h1>hello</h1>)
        ) : (
          <NoAttachments action={() => setOpen(true)} />
        )}
      </Box>
      <UploadAttachmentModal open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Attachments;
