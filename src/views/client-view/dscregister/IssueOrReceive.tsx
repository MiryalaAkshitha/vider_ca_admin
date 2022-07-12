import { Box, Button, TextField } from "@mui/material";
import { issueOrReceiveDsc } from "api/services/client";
import DialogWrapper from "components/DialogWrapper";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

interface Props extends DialogProps {
  type: "issue" | "receive";
  dscRegister: number;
}

function IssueOrReceive(props: Props) {
  const { open, setOpen, type, dscRegister } = props;
  const queryClient = useQueryClient();
  const [personName, setPersonName] = useState<string>("");

  const { mutate } = useMutation(issueOrReceiveDsc, {
    onSuccess: (res) => {
      snack.success("Dsc Register Created");
      setPersonName("");
      queryClient.invalidateQueries("dsc-register");
      queryClient.invalidateQueries("dsc-register-details");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      id: dscRegister,
      data: {
        type,
        personName,
      },
    });
  };

  return (
    <DialogWrapper
      title={type === "issue" ? "Issue" : "Receive"}
      open={open}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ mt: 1 }}
          variant="outlined"
          required
          label={`Enter the DSC ${
            type === "issue" ? "issued" : "received"
          }  person name`}
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          fullWidth
        />
        <Box mt={3} textAlign="center">
          <Button
            type="submit"
            size="large"
            color="primary"
            variant="contained"
          >
            {type === "issue" ? "Issue" : "Receive"}
          </Button>
        </Box>
      </form>
    </DialogWrapper>
  );
}

export default IssueOrReceive;
