import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTaskAttachments } from "api/services/tasks";
import { noAttachments } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { ResponseType } from "types";
import File from "views/clients/Attachments/Files/File";
import UploadAttachmentModal from "./UploadAttachmentModal";

function Attachments() {
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResponseType = useQuery(
    ["task-attachments", params.taskId],
    getTaskAttachments
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Attachments
        </Typography>
        {data?.data?.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            variant="outlined"
          >
            Add Attachment
          </Button>
        ) : null}
      </Box>
      <Box mt={3}>
        <Grid container spacing={2}>
          {data?.data?.length ? (
            data?.data?.map((item: any, index: number) => (
              <Grid item md={4} lg={3} xl={2}>
                <File data={item} key={index} />
              </Grid>
            ))
          ) : (
            <NoItems
              img={noAttachments}
              title="Have something to attach?"
              desc="Attach task related files here for other members in the team to view or download"
              btnTitle="Add Attachment"
              btnAction={() => setOpen(true)}
            />
          )}
        </Grid>
      </Box>
      <UploadAttachmentModal open={open} setOpen={setOpen} />
    </>
  );
}

export default Attachments;
