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
import Loader from "components/Loader";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddCustomField from "./AddCustomField";

function Fields() {
  const [open, setOpen] = useState(false);
  const { data, isLoading }: ResType = useQuery(["fields"], getFields);

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
                  <ListItemButton sx={{ py: "12px" }}>
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
