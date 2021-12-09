import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import React from "react";

interface StateProps {
  msg: string;
  action: () => void;
}

type ContextProps = (args: StateProps) => void;

export const ConfirmDialogContext = React.createContext<ContextProps>(() => {});

function ConfirmDialogProvider({ children }: any) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<StateProps>({
    msg: "",
    action: () => {},
  });

  const handleClose = () => {
    setOpen(false);
  };

  let onOk = () => {
    state.action();
    handleClose();
  };

  let confirm = (args: StateProps) => {
    let { msg, action } = args;
    setOpen(true);
    setState({
      msg,
      action,
    });
  };

  return (
    <ConfirmDialogContext.Provider value={confirm}>
      {children}
      <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
        <Box p={2}>
          <Box>
            <Typography color="primary" gutterBottom variant="subtitle1">
              Warning
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {state.msg}
            </Typography>
          </Box>
          <Box mt={3} display="flex" gap={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              sx={{ minWidth: 70 }}
              size="small"
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ minWidth: 70 }}
              size="small"
              onClick={onOk}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Dialog>
    </ConfirmDialogContext.Provider>
  );
}

export const useConfirm = () => React.useContext(ConfirmDialogContext);

export default ConfirmDialogProvider;
