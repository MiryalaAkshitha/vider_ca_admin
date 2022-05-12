import { Dialog, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { addAttachment } from "api/services/tasks";
import FileDrop from "components/FileDrop";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { DialogProps } from "types";
import { GreyButton } from "views/taskboard/styles";
import ClientLibrary from "./ClientLibrary";

function UploadAttachmentModal({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();

  const [files, setFiles] = useState<File[]>([]);
  const [value, setValue] = useState(0);
  const params: any = useParams();

  const handleChange = (e: any, newValue: number) => {
    setValue(newValue);
  };

  const { mutate, isLoading } = useMutation(addAttachment, {
    onSuccess: () => {
      snack.success("Attachment(s) Added");
      setOpen(false);
      setFiles([]);
      queryClient.invalidateQueries("task-attachments");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleUpload = () => {
    let formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    mutate({ taskId: params.taskId, data: formData });
  };

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={setOpen}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Upload from PC" {...a11yProps(0)} />
          <Tab label="Client Library" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FileDrop
          multiple
          sx={{ minHeight: 300 }}
          onChange={(files: File[]) => setFiles(files)}
        />
        <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
          <LoadingButton
            title="Upload Files"
            disabled={!files.length}
            disableElevation
            color="secondary"
            loading={isLoading}
            onClick={handleUpload}
          />
          <GreyButton onClick={() => setOpen(false)}>Cancel</GreyButton>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ClientLibrary setOpen={setOpen} />
      </TabPanel>
    </Dialog>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default UploadAttachmentModal;
