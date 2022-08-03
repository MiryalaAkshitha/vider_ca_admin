import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { getChecklists } from "api/services/tasks/tasks";
import { noChecklists } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddChecklist from "./AddChecklist";
import CheckList from "./CheckList";

function Checklists() {
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery(
    ["checklists", params.taskId],
    getChecklists
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Checklists
        </Typography>
        {data?.data?.length ? (
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
        {data?.data?.length ? (
          data?.data?.map((item: any, index: number) => (
            <CheckList data={item} key={index} />
          ))
        ) : (
          <NoItems
            img={noChecklists}
            title="Add Checklist to you task"
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
