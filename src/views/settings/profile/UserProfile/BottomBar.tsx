import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { updateProfile } from "api/services/users";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { aadharPattern, emailPattern, panCardPattern } from "utils/patterns";
import { GreyButton } from "views/tasks/styles";

function BottomBar({ data, state, setState }) {
  const queryClient = useQueryClient();
  const [isStateChanged, setIsStateChanged] = useState(false);

  useEffect(() => {
    setIsStateChanged(JSON.stringify(data) !== JSON.stringify(state));
  }, [state, data]);

  const { mutate } = useMutation(updateProfile, {
    onSuccess: () => {
      snack.success("Profile updated successfully");
      queryClient.invalidateQueries("user-profile");
    },
    onError: () => {
      snack.error("Error updating profile");
    },
  });

  const handleSubmit = () => {
    if (state.workEmail && !emailPattern.test(state.workEmail)) {
      return snack.error("Invalid email");
    }

    if (state.aadharNumber && !aadharPattern.test(state.aadharNumber)) {
      return snack.error("Invalid aadhar number");
    }

    if (state.panNumber && !state.panNumber.match(panCardPattern)) {
      return snack.error("Invalid pan number");
    }

    mutate({
      ...state,
      id: data?.id,
      type: "user",
    });
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
          onClick={handleSubmit}
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
