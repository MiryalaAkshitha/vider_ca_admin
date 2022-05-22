import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { noChecklists } from "assets";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addServiceState } from "redux/reducers/addServiceSlice";
import AddChecklist from "./AddChecklist";
import CheckList from "./CheckList";

function Checklists() {
  const [open, setOpen] = useState<boolean>(false);
  const { checklists } = useSelector(addServiceState);
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Checklists
        </Typography>
        {checklists.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Add checklist
          </Button>
        ) : null}
      </Box>
      <Box mt={2}>
        {checklists?.length ? (
          checklists.map((item: any, index: number) => (
            <CheckList data={item} key={index} index={index} />
          ))
        ) : (
          <NoItems
            img={noChecklists}
            title="Add Checklist to your service"
            desc="Create a Checklist and add checklist items to it."
            btnTitle="Add Checklist"
            btnAction={() => setOpen(true)}
          />
        )}
      </Box>
      <AddChecklist open={open} setOpen={setOpen} />
    </>
  );
}

export default Checklists;
