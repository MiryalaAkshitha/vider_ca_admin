import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { updateClient } from "api/services/client";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { GreyButton } from "views/taskboard/styles";

function BottomBar({ data, state, setState }) {
  const queryClient = useQueryClient();
  const params = useParams();
  const snack = useSnack();
  const [isStateChanged, setIsStateChanged] = useState(false);

  useEffect(() => {
    setIsStateChanged(JSON.stringify(data) !== JSON.stringify(state));
  }, [state, data]);

  const { mutate } = useMutation(updateClient, {
    onSuccess: () => {
      snack.success("Profile Updated");
      queryClient.invalidateQueries("client");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onSubmit = () => {
    const { imageUrl, ...data } = state;
    mutate({ data, id: params.clientId });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: isStateChanged ? 0 : "-100%",
        width: "100%",
        zIndex: "100",
        transition: "0.8s",
        left: 0,
      }}
    >
      <Box p={2} display="flex" justifyContent="flex-end" gap={2}>
        <Button
          onClick={onSubmit}
          size="large"
          color="secondary"
          variant="contained"
        >
          Update Changes
        </Button>
        <GreyButton
          onClick={() => setState(data)}
          size="large"
          color="secondary"
          variant="contained"
        >
          Cancel
        </GreyButton>
      </Box>
    </Paper>
  );
}

export default BottomBar;
