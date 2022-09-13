import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteLabel, getLabels } from "api/services/labels";
import { useConfirm } from "context/ConfirmDialog";
import Loader from "components/Loader";
import Table from "components/Table";
import { snack } from "components/toast";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import AddLabel from "views/settings/labels/AddLabel";
import { StyledLabel } from "views/settings/labels/styles";
import FloatingButton from "components/FloatingButton";

function Labels() {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

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
    <Box p={3}>
      <Table
        columns={[
          {
            title: "Label",
            key: "name",
            render: (item) => (
              <Typography variant="body1" color="primary">
                {item?.name}{" "}
                {item?.defaultOne && (
                  <Typography color="rgba(0,0,0,0.8)" mt="4px" variant="caption">
                    (default)
                  </Typography>
                )}
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
            render: (item) => {
              return !item?.defaultOne ? (
                <IconButton onClick={() => handleRemove(item?.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              ) : null;
            },
          },
        ]}
        loading={isLoading}
        data={data?.data || []}
      />
      <FloatingButton
        onClick={() => {
          setOpen(true);
        }}
      />
      <AddLabel open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Labels;
