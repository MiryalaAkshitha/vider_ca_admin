import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { getFields } from "api/services/forms";
import { addDDFormField } from "api/services/tasks";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import { Fragment, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import AddCustomField from "./AddCustomField";

interface Props {
  activeFormId: number | null;
}

function Fields({ activeFormId }: Props) {
  const snack = useSnack();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data, isLoading }: ResType = useQuery(["fields"], getFields);

  const { mutate } = useMutation(addDDFormField, {
    onSuccess: () => {
      snack.success("Field added successfully");
      queryClient.invalidateQueries("dd-forms");
      setOpen(false);
    },
    onError: () => {
      snack.error("Error adding field");
      setOpen(false);
    },
  });

  const handleClick = (item: any) => {
    mutate({ data: { ...item }, formId: activeFormId });
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          background: "#F9FAFC",
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "70vh",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
            alignItems: "center",
            mb: 1,
            pb: 1,
          }}
        >
          <Typography color="primary" variant="subtitle2">
            Add Fields
          </Typography>
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Custom Field
          </Button>
        </Box>
        <Box
          flex={1}
          sx={{
            overflowY: "auto",
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <List>
              {data?.data.map((item: any, index: number) => (
                <Fragment key={index}>
                  <ListItemButton
                    onClick={() => handleClick(item)}
                    sx={{ py: "12px" }}
                  >
                    <ListItemText primary={item?.name} />
                  </ListItemButton>
                  {index !== data?.data?.length - 1 && (
                    <Divider sx={{ background: "rgba(0,0,0,0.01)" }} />
                  )}
                </Fragment>
              ))}
            </List>
          )}
        </Box>
      </Paper>
      <AddCustomField open={open} setOpen={setOpen} />
    </>
  );
}

export default Fields;
