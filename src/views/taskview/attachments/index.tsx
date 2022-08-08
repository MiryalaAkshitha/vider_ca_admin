import { Add } from "@mui/icons-material";
import { Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTaskAttachments } from "api/services/tasks/tasks";
import { noAttachments } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { setPermissions } from "redux/reducers/storageSlice";
import { ResType } from "types";
import File from "views/storage/Files/File";
import Link from "views/storage/Links/Link";
import UploadAttachmentModal, { a11yProps } from "./UploadAttachmentModal";

function Attachments() {
  const dispatch = useDispatch();
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(
      setPermissions({
        write: true,
        edit: true,
        delete: true,
      })
    );
  }, [dispatch]);

  const handleChange = (e: any, newValue: number) => {
    setValue(newValue);
  };
  const { data, isLoading }: ResType = useQuery(
    ["task-attachments", params.taskId],
    getTaskAttachments
  );

  const files = data?.data?.filter((file: any) => file.type === "file") || [];
  const links = data?.data?.filter((file: any) => file.type === "link") || [];
  const localFilePaths =
    data?.data?.filter((file: any) => file.type === "local_path") || [];

  const renderAttachments = () => {
    if (value === 0 && files.length > 0) {
      return files?.map((item: any) => (
        <Grid item xl={3} lg={3} key={item?.id}>
          <File data={item} />
        </Grid>
      ));
    }

    if (value === 1 && links.length > 0) {
      return links?.map((item: any) => (
        <Grid item xl={3} lg={3} key={item?.id}>
          <Link data={item} />
        </Grid>
      ));
    }

    if (value === 2 && localFilePaths.length > 0) {
      return localFilePaths?.map((item: any) => (
        <Grid item xl={3} lg={3} key={item?.id}>
          <Link data={item} local />
        </Grid>
      ));
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {data?.data?.length > 0 ? (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Files" {...a11yProps(0)} />
            <Tab label="Links" {...a11yProps(1)} />
            <Tab label="Local File Paths" {...a11yProps(2)} />
          </Tabs>
        ) : (
          <Typography variant="subtitle1" color="primary">
            Attachments
          </Typography>
        )}
        {data?.data?.length ? (
          <Button
            startIcon={<Add />}
            onClick={() => setOpen(true)}
            color="secondary"
          >
            Add
          </Button>
        ) : null}
      </Box>
      <Box mt={3}>
        <Grid container spacing={2}>
          {data?.data?.length > 0 ? (
            <> {renderAttachments()}</>
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
