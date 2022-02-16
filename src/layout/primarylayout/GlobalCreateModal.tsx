import Dialog from "@mui/material/Dialog";

function GlobalCreateModal({ open, setOpen, children }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {children}
      </Dialog>
    </>
  );
}

export default GlobalCreateModal;
