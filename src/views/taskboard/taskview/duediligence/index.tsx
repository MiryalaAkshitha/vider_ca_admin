import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { getChecklists } from "api/services/tasks";
import { noDueDiligence } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ResType } from "types";

function DueDiligence(props: any) {
  const navigate = useNavigate();
  const params: any = useParams();

  const { data, isLoading }: ResType = useQuery(
    ["checklists", params.taskId],
    getChecklists
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Due Diligence
        </Typography>
        {data?.data?.length ? (
          <Button
            onClick={() => {
              navigate(`/task-board/${params.taskId}/due-diligence`);
            }}
            color="secondary"
            startIcon={<Add />}
          >
            Add Due Diligence
          </Button>
        ) : null}
      </Box>
      <Box mt={2}>
        {data?.data?.length ? (
          data?.data?.map((item: any, index: number) => <h1>hello</h1>)
        ) : (
          <NoItems
            img={noDueDiligence}
            title="Add due diligence to you task"
            desc="Create a custom form for the task and share it with your clients"
            btnTitle="Add Due Diligence"
            btnAction={() =>
              navigate(`/task-board/${params.taskId}/due-diligence`)
            }
          />
        )}
      </Box>
    </>
  );
}

export default DueDiligence;
