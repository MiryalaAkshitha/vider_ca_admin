import { Box, Grid, Paper } from "@mui/material";
import { getDDForms } from "api/services/tasks";
import BreadCrumbs from "components/BreadCrumbs";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddCustomField from "views/taskboard/dueDiligence/AddCustomField";
import Fields from "views/taskboard/dueDiligence/Fields";
import FormFields from "views/taskboard/dueDiligence/FormFields";
import Forms from "views/taskboard/dueDiligence/Forms";

function DueDiligence() {
  useTitle("Due Diligence");
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [data, setData] = useState<any[]>([]);

  const { isLoading }: ResType = useQuery(
    ["dd-forms", { taskId: params.taskId }],
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
    <>
      <Box p={2} bgcolor="white">
        <BreadCrumbs page="dueDiligence" />
        <Box pt={5} py={3}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Paper elevation={1} sx={{ p: 3, minHeight: "70vh" }}>
                <Forms setValue={setValue} value={value} data={data} />
                <FormFields value={value} data={data} setData={setData} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Fields activeFormId={data[value]?.id} setOpen={setOpen} />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <AddCustomField
        open={open}
        setOpen={setOpen}
        activeFormId={data[value]?.id}
      />
    </>
  );
}

export default DueDiligence;
