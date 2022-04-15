import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { getForm } from "api/services/forms";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { ResType } from "types";
import ViewPageFields from "../../views/forms/AccessFormFields";

function ViewForm() {
  const snack = useSnack();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const { isLoading }: ResType = useQuery(
    ["form-details", params.formId],
    getForm,
    {
      onSuccess: (res) => {
        setData(res.data);
      },
      onError: (err) => {
        snack.error(err.message);
      },
    }
  );

  const handleNext = (pageData: any) => {
    if (active === data?.pages?.length - 1) {
      return;
    }
    setFormData({
      ...formData,
      [data?.pages[active]._id]: pageData,
    });
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
          {data?.pages?.map((item: any, index: number) => (
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
        <ViewPageFields data={data} active={active} onContinue={handleNext} />
      </Paper>
    </Box>
  );
}

export default ViewForm;
