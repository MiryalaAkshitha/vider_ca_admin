import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { updateClient } from "api/services/client";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { GreyButton } from "views/taskboard/styles";

function BottomBar({ data, state, setState }) {
  const queryClient = useQueryClient();
  const params = useParams();

  const [isStateChanged, setIsStateChanged] = useState(false);

  useEffect(() => {
    let { panNumber, gstNumber, ...remData } = data;
    let {
      panNumber: statePanNumber,
      gstNumber: stateGstNumber,
      ...remStateData
    } = state;
    setIsStateChanged(JSON.stringify(remData) !== JSON.stringify(remStateData));
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
