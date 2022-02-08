import { Box } from "@mui/system";
import { getOrganization, updateOrganization } from "api/services/organization";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import Details from "./Details";
import Profile from "./Profile";

function ProfileDetails() {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<any>({});

  const { data, isLoading }: ResType = useQuery(
    ["organization"],
    getOrganization,
    {
      onSuccess: (res: any) => {
        setState(res.data);
      },
      cacheTime: 0,
    }
  );

  const { mutate } = useMutation(updateOrganization, {
    onSuccess: () => {
      snack.success("Profile Updated");
      queryClient.invalidateQueries("organization");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleUpdate = () => {
    const { imageUrl, ...data } = state;
    mutate({ data });
  };

  if (isLoading) return <Loader />;

  return (
    <Box px={4} pt={2} pb={10}>
      <Profile data={state} setState={setState} onUpdate={handleUpdate} />
      <Details apiData={data?.data} data={state} setState={setState} />
    </Box>
  );
}

export default ProfileDetails;
