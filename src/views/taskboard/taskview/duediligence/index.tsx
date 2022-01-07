import { PlayArrow } from "@mui/icons-material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { getDDForms } from "api/services/tasks";
import { noDueDiligence } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ResType } from "types";
import DDItem from "./DdItem";

function DueDiligence() {
  const navigate = useNavigate();
  const params: any = useParams();

  const { data, isLoading }: ResType = useQuery(
    ["dd-forms", { taskId: params.taskId }],
    getDDForms
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Due Diligence
        </Typography>
        {data?.data?.length ? (
          <Box>
            <a
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
              href={`/due-diligence/${data?.data[0]?.task?.uid}?preview=true`}
              target="_blank"
            >
              <Button startIcon={<PlayArrow />} color="primary">
                Preview
              </Button>
            </a>
            <Button
              sx={{ ml: 1 }}
              onClick={() => {
                navigate(`/task-board/${params.taskId}/due-diligence`);
              }}
              startIcon={<EditRoundedIcon />}
              color="secondary"
            >
              Edit Due Diligence
            </Button>
          </Box>
        ) : null}
      </Box>
      <Box mt={2}>
        {data?.data?.length ? (
          <>
            <Box display="flex" gap={2} flexWrap="wrap">
              {data?.data?.map((item: any, index: number) => (
                <DDItem data={item} key={index} index={index} />
              ))}
            </Box>
            <LinearProgress
              sx={{
                mt: 6,
                mb: 1,
                height: "7px",
                borderRadius: 10,
                background: "#F5F5F5",
                "& .MuiLinearProgress-bar": {
                  background: "#89B152",
                },
              }}
              variant="determinate"
              value={50}
            />
            <Typography variant="subtitle2" color="secondary">
              72% Due diligence form has been filled by your client.
            </Typography>
          </>
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
