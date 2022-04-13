import { Box } from "@mui/system";
import ComingSoon from "components/ComingSoon";
import { useForm } from "react-hook-form";
import FormBuilderUpload from "views/forms/formBuilderFields/FormBuilderUpload";

function Dashboard() {
  const { watch, control } = useForm({
    mode: "onChange",
    defaultValues: {
      aadhar: [],
    },
  });

  console.log(watch("aadhar"));

  return (
    <Box p={2}>
      <form>
        <FormBuilderUpload
          accepted={["image/png", "application/pdf", "image/jpg", "image/jpeg"]}
          name="aadhar"
          id="aa123"
          label="Aadhar"
          control={control}
          maxFileSize={{ type: "MB", size: 1 }}
          max={2}
        />
      </form>
      <ComingSoon title="Dashboard" />
    </Box>
  );
}

export default Dashboard;
