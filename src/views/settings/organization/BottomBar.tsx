import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { updateOrganization } from "api/services/organization";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { GreyButton } from "views/taskboard/styles";

function BottomBar({ data, state, setState }) {
  const queryClient = useQueryClient();

  const [isStateChanged, setIsStateChanged] = useState(false);

  useEffect(() => {
    setIsStateChanged(JSON.stringify(data?.data) !== JSON.stringify(state));
  }, [state, data]);

  const { mutate } = useMutation(updateOrganization, {
    onSuccess: () => {
      snack.success("Organization Profile Updated");
      queryClient.invalidateQueries("organization");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onSubmit = () => {
    const { logoUrl, ...data } = state;
    mutate({ data });
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
      }}
    >
      <Box p={2} display="flex" gap={2}>
        <Button
          onClick={onSubmit}
          size="large"
          color="secondary"
          variant="contained"
        >
          Update Changes
        </Button>
        <GreyButton
          onClick={() => setState(data.data)}
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
