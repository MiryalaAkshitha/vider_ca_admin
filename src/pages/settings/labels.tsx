import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteLabel, getLabels } from "api/services/labels";
import { useConfirm } from "components/ConfirmDialogProvider";
import Loader from "components/Loader";
import Table from "components/Table";
import useSnack from "hooks/useSnack";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import AddLabel from "views/settings/labels/AddLabel";
import { StyledLabel } from "views/settings/labels/styles";

function Tags() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const snack = useSnack();
  const confirm = useConfirm();

  const { data, isLoading }: ResType = useQuery("labels", getLabels);

  useTitle("Labels");

  const { mutate } = useMutation(deleteLabel, {
    onSuccess: () => {
      snack.success("Label Deleted");
      setOpen(false);
      queryClient.invalidateQueries("labels");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleRemove = (id: any) => {
    confirm({
      msg: "Are you sure you want to delete this label?",
      action: () => {
        mutate(id);
      },
    });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box textAlign="right" mt={2}>
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          startIcon={<Add />}
          color="secondary"
        >
          Add Label
        </Button>
      </Box>
      <Box maxWidth={800}>
        <Table
          columns={[
            {
              title: "Label",
              key: "name",
              render: (item) => (
                <Typography variant="body1" color="primary">
                  {item?.name}
                </Typography>
              ),
            },
            {
              title: "View",
              key: "color",
              render: (item) => (
                <StyledLabel color={item?.color}>
                  <Typography variant="body2">{item?.name}</Typography>
                </StyledLabel>
              ),
            },
            {
              title: "Actions",
              key: "actions",
              render: (item) => (
                <IconButton onClick={() => handleRemove(item?.id)} size="small">
                  <Delete color="secondary" fontSize="small" />
                </IconButton>
              ),
            },
          ]}
          loading={isLoading}
          data={data?.data || []}
        />
      </Box>
      <AddLabel open={open} setOpen={setOpen} />
    </>
  );
}

export default Tags;
