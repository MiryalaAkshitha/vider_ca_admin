import { Box } from "@mui/system";
import ComingSoon from "components/ComingSoon";
import { useForm } from "react-hook-form";
import FormBuilderPhone from "views/forms/formBuilderFields/FormBuilderPhone";
import FormBuilderUpload from "views/forms/formBuilderFields/FormBuilderUpload";

function Dashboard() {
  const { control } = useForm({
    mode: "onChange",

    defaultValues: {
      aadhar: "",
    },
  });
  return (
    <Box p={2}>
      <form>
        <FormBuilderUpload
          accepted={["image/png"]}
          name="aadhar"
          label="Aadhar"
          control={control}
        />
      </form>
      <ComingSoon title="Dashboard" />
    </Box>
  );
}

export default Dashboard;
