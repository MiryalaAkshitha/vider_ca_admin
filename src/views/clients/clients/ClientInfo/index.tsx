import { Box } from "@mui/system";
import { getKybForms } from "api/services/client-info";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddedSections from "./AddedSections";
import FormsContainer from "./FormsContainer";
import KybDetails from "./KybDetails";

function KybInfo() {
  const params = useParams();
  const clientId = params.clientId || "";
  const [selectedForm, setSelectedForm] = useState<any>(null);

  const { data, isLoading }: ResType = useQuery(
    ["kyb-info", { clientId }],
    getKybForms,
    {
      onSuccess: (res) => {
        setSelectedForm(res.data[0]);
      },
    }
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box px={4} py={2} display="flex" justifyContent="space-between" gap={4}>
        <Box sx={{ maxWidth: 1000, width: "100%" }}>
          <KybDetails selectedForm={selectedForm} />
        </Box>
        <Box sx={{ maxWidth: 500, width: "100%" }}>
          <AddedSections
            selectedForm={selectedForm}
            setSelectedForm={setSelectedForm}
            data={data?.data}
          />
          <FormsContainer />
        </Box>
      </Box>
    </>
  );
}

export default KybInfo;
