import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import AddField from "./AddField";

function FieldsContainer() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box p={2}>
        <Box
          display='flex'
          mb={2}
          justifyContent='space-between'
          alignItems='center'>
          <Typography variant='subtitle1' color='primary'>
            Fields
          </Typography>
          <Button
            onClick={() => setOpen(true)}
            size='small'
            startIcon={<Add />}
            variant='outlined'
            color='secondary'>
            Add Field
          </Button>
        </Box>
        <SearchContainer
          maxWidth='100%'
          placeHolder='Search for a field'
          onChange={(v) => console.log(v)}
        />
      </Box>
      <AddField open={open} setOpen={setOpen} />
    </>
  );
}

export default FieldsContainer;
