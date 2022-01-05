import { getDDForms } from "api/services/tasks";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Paper, StepButton } from "@mui/material";
import { renderField } from "views/clients/ClientInfo/renderField";

function DueDiligencePreview() {
  useTitle("Due Diligence Preview");
  const params = useParams();
  const [data, setData] = useState<any[]>([]);
  const [active, setActive] = useState(0);

  const { isLoading }: ResType = useQuery(
    ["dd-forms", { taskUid: params.taskId }],
    getDDForms,
    {
      onSuccess: (data: any) => {
        console.log(data);
        const sorted = data?.data?.map((item: any) => ({
          ...item,
          dueDiligenceFormFields: item.dueDiligenceFormFields?.sort(
            (a: any, b: any) => +a.order - +b.order
          ),
        }));
        setData(sorted);
      },
    }
  );

  if (isLoading) return <Loader />;

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        pb: 8,
        maxWidth: 1000,
        margin: "auto",
      }}
    >
      <Stepper activeStep={active} alternativeLabel>
        {data?.map((item: any, index: number) => (
          <Step key={index}>
            <StepLabel
              sx={{ cursor: "pointer" }}
              onClick={() => setActive(index)}
            >
              {item?.name}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box maxWidth={600} margin="auto" mt={4}>
        {data[active]?.dueDiligenceFormFields?.map((item: any) => (
          <Box mb={3}>
            {renderField(item, (e: any) => console.log(item, e))}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default DueDiligencePreview;
