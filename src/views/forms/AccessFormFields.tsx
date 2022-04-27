import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import _ from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { dynamicSchema } from "views/forms/utils/generateSchema";
import RenderField from "views/forms/utils/RenderField";
import { generateDefaultValues } from "./utils/generateDefaultValues";

function ViewPageFields({ data, active, onContinue }: any) {
  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: generateDefaultValues(data?.pages[active]?.fields),
    resolver: yupResolver(dynamicSchema(data?.pages[active]?.fields)),
  });

  const onSubmit = (data: any) => {
    onContinue(data);
  };

  useEffect(() => {
    const { errors } = formState;
    if (_.isEmpty(errors)) return;
    let firstError = Object.keys(errors)[0];
    document.getElementById(firstError)?.scrollIntoView();
  }, [formState]);

  return (
    <>
      <Box px={8} margin="auto" mt={4}>
        {data?.pages[active]?.fields?.map((item: any, index: number) => (
          <Box key={index} mb={4} id={item?._id}>
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
          {active < data?.length - 1 ? "Continue" : "Submit"}
        </Button>
      </Box>
    </>
  );
}

export default ViewPageFields;
