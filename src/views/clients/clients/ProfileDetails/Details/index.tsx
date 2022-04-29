import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getStates } from "api/services/common";
import { getLabels } from "api/services/labels";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { ResType } from "types";
import ContactPersonDetails from "../ContactPersonDetails";
import AdditionalInformation from "./AdditionalInformation";
import BasicInformation from "./BasicInformation";
import OrganisationAddress from "./OrganisationAddress";
import OrganizationInformation from "./OrganizationInformation";

interface IDetailsProps {
  data: any;
  apiData: any;
  setState: (data: any) => void;
  onUpdate: () => void;
}

function Details({ data, apiData, setState, onUpdate }: IDetailsProps) {
  const { isLoading }: ResType = useQuery("labels", getLabels);

  const { isLoading: userLoading }: ResType = useQuery("users", getUsers);

  const { isLoading: statesLoading }: ResType = useQuery("states", getStates);

  const handleChange = (e: any) => {
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e: any) => {
    setState({
      ...data,
      category: e.target.value,
      subCategory: null,
    });
  };

  if (isLoading || userLoading || statesLoading) return <Loader />;

  return (
    <Box mt={3}>
      <BasicInformation
        data={data}
        handleCategoryChange={handleCategoryChange}
        onUpdate={onUpdate}
        handleChange={handleChange}
      />

      <OrganizationInformation
        data={data}
        onUpdate={onUpdate}
        handleChange={handleChange}
      />
      <OrganisationAddress
        data={data}
        onUpdate={onUpdate}
        handleChange={handleChange}
        setState={setState}
      />
      <Grid item xs={12} sx={{ mt: 2 }}>
        <ContactPersonDetails data={data?.contactPersons} />
      </Grid>
      <AdditionalInformation
        data={data}
        handleCategoryChange={handleCategoryChange}
        onUpdate={onUpdate}
        handleChange={handleChange}
        setState={setState}
        apiData={apiData}
      />
    </Box>
  );
}

export default Details;
