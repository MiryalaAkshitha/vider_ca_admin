import { Button, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { getDDForms } from "api/services/tasks";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { ResType } from "types";
import { renderField } from "views/clients/ClientInfo/renderField";

function DueDiligencePreview() {
  useTitle("Due Diligence Preview");
  const snack = useSnack();
  const [searchParams] = useSearchParams();
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

  const handleChange = (item: any, index: number, value: any) => {
    const newData = [...data];
    newData[active]["dueDiligenceFormFields"][index].value = value;
    setData(newData);
  };

  const handleSubmit = () => {
    for (let item of data[active]["dueDiligenceFormFields"]) {
      if (item.required && !item.value) {
        snack.error(`${item.name} is required`);
        return;
      }
    }
    if (active === data.length - 1) {
      return;
    }
    setActive(active + 1);
  };

  if (isLoading) return <Loader />;

  return (
    <Box py={3} px={2}>
      <Paper
        elevation={1}
        sx={{
          py: 8,
          maxWidth: 1000,
          margin: "auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {searchParams.get("preview") === "true" && (
          <Box
            sx={{
              p: 1,
              width: "200px",
              textAlign: "center",
              position: "absolute",
              right: -70,
              top: 20,
              transform: "rotate(45deg)",
              background: (theme) => theme.palette.secondary.main,
            }}
          >
            <Typography color="white" variant="caption">
              Preview
            </Typography>
          </Box>
        )}
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
          {data[active]?.dueDiligenceFormFields?.map(
            (item: any, index: number) => (
              <Box mb={3} key={index}>
                {renderField(item, (v: any) => handleChange(item, index, v))}
              </Box>
            )
          )}
        </Box>
        <Box mt={8} textAlign="center">
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ minWidth: 300 }}
            color="secondary"
          >
            {active < data?.length - 1 ? "Save and Continue" : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default DueDiligencePreview;
