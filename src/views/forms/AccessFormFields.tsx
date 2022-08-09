import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import _ from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { dynamicSchema } from "views/forms/utils/generateSchema";
import RenderField from "views/forms/utils/RenderField";
import { generateDefaultValues } from "./utils/generateDefaultValues";

function AccessFormFields({ data, active, onContinue }: any) {
  console.log("data", data);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(dynamicSchema(data)),
  });

  useEffect(() => {
    reset(generateDefaultValues(data));
  }, [data, reset]);

  const onSubmit = (data: any) => {
    onContinue(data);
  };

  useEffect(() => {
    const { errors } = formState;
    if (_.isEmpty(errors)) return;
    let firstError = Object.keys(errors)[0];
    let element = document.getElementById(firstError);
    let scrollTo = element!?.offsetTop - 200;
    window.scrollTo({
      top: scrollTo,
      behavior: "smooth",
    });
  }, [formState]);

  return (
    <>
      <Box px={8} margin="auto" mt={4}>
        {data?.map((item: any) => (
          <Box key={item?._id} mb={4} id={item?._id}>
            <RenderField item={item} control={control} />
          </Box>
        ))}
      </Box>
      <Box mt={8} textAlign="center">
        <Button
          variant="contained"
          sx={{ minWidth: 300 }}
          color="secondary"
          onClick={handleSubmit(onSubmit)}
        >
          {active < data?.length - 1 ? "Save and continue" : "Submit"}
        </Button>
      </Box>
    </>
  );
}

export default AccessFormFields;
