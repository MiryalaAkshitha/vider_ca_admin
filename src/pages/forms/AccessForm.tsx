import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { getForm, updatePage } from "api/services/forms";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { ResType } from "types";
import { FormBuilderFieldTypes } from "views/forms/utils/renderFieldsComponent";
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

  const { mutate: updatePageFields } = useMutation(updatePage, {
    onSuccess: () => {
      snack.success("Values saved");
      if (active === data?.pages?.length - 1) {
        return;
      }
      setActive(active + 1);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (pageData: any) => {
    let finalData = {
      ...formData,
      [data?.pages[active]._id]: pageData,
    };

    let activePageData = finalData[data?.pages[active]._id];
    let activeFields = [...data?.pages[active].fields];

    for (let key in activePageData) {
      const value = activePageData[key];
      const field = activeFields?.find((field: any) => field._id === key);
      const type = field?.fieldType;

      if (!field) continue;

      let hasInputs =
        type === FormBuilderFieldTypes.NAME ||
        type === FormBuilderFieldTypes.ADDRESS;

      if (!hasInputs) {
        field.value = value || null;
        continue;
      }

      Object.keys(value).forEach((inputKey) => {
        let input = field.inputs?.find((input: any) => input._id === inputKey);

        if (!input) return;

        input.value = value[inputKey] || null;
      });
    }

    updatePageFields({
      formId: params.formId,
      pageId: data?.pages[active]?._id,
      data: {
        fields: activeFields,
      },
    });
  };

  const handleNext = (pageData: any) => {
    setFormData({
      ...formData,
      [data?.pages[active]._id]: pageData,
    });

    handleSubmit(pageData);
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
