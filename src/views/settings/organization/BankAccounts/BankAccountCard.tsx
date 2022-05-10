import { MoreVert } from "@mui/icons-material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { deleteBankAccount } from "api/services/organization";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import useSnack from "hooks/useSnack";
import { MouseEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditBankAccount from "./EditBankAccount";

const BankAccountDetailsCard = ({ data }) => {
  const confirm = useConfirm();
  const snack = useSnack();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const menu = useMenu();

  const { mutate } = useMutation(deleteBankAccount, {
    onSuccess: (res) => {
      snack.success("Bank account delete");
      queryClient.invalidateQueries("bank-accounts");
      setOpen(false);
    },

    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this bank account?",
      action: () => {
        mutate({
          id: data.id,
        });
      },
    });
  };

  const handleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => setOpen(true),
        },
        {
          label: "Delete",
          action: handleDelete,
        },
      ],
    });
  };

  return (
    <Box
      sx={{
        background: "#FBF9F2",
        borderRadius: "8px",
        p: 2,
        position: "relative",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          "& > *": {
            marginTop: "10px",
          },
        }}
      >
        <Grid item xs={6}>
          <Typography variant="body2">Bank Name</Typography>
          <Typography sx={{ fontSize: 15 }} variant="subtitle2">
            {data?.bankName}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Branch Name</Typography>
          <Typography sx={{ fontSize: 15 }} variant="subtitle2">
            {data?.branchName}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Account Number</Typography>
          <Typography sx={{ fontSize: 15 }} variant="subtitle2">
            {data?.accountNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">IFSC Code</Typography>
          <Typography sx={{ fontSize: 15 }} variant="subtitle2">
            {data?.ifscCode}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">UPI Id</Typography>
          <Typography sx={{ fontSize: 15 }} variant="subtitle2">
            {data?.upiId}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">UPI Attachment</Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Typography sx={{ fontSize: 15 }} variant="subtitle2">
              UPI QR
            </Typography>
            <a
              href={data?.upiAttachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton>
                <OpenInNewRoundedIcon color="secondary" fontSize="small" />
              </IconButton>
            </a>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <IconButton onClick={handleMenu}>
          <MoreVert />
        </IconButton>
      </Box>
      <EditBankAccount open={open} setOpen={setOpen} data={data} />
    </Box>
  );
};
export default BankAccountDetailsCard;
