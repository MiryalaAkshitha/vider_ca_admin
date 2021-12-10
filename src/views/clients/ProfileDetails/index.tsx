import { Box } from "@mui/system";
import { getClient, updateClient } from "api/services/client";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ResponseType } from "types";
import Details from "./Details";
import Profile from "./Profile";

function ProfileDetails() {
  const params = useParams();
  const snack = useSnack();
  const [state, setState] = useState<any>({});
  const queryClient = useQueryClient();

  const { isLoading }: ResponseType = useQuery(
    ["client", params.clientId],
    getClient,
    {
      onSuccess: (res: any) => {
        setState(res.data);
      },
      refetchOnWindowFocus: false,
    }
  );

  const { mutate, isLoading: updateProfileLoading } = useMutation(
    updateClient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("client");
        snack.success("Profile Updated");
      },
      onError: (err: any) => {
        snack.error(err.response.data.message);
      },
    }
  );

  const handleUpdate = () => {
    let { imageUrl, ...data } = state;
    mutate({ data, clientId: params.clientId });
  };

  if (isLoading || updateProfileLoading) return <Loader />;

  return (
    <Box px={4} pt={2} pb={10}>
      <Profile data={state} setState={setState} onUpdate={handleUpdate} />
      <Details data={state} setState={setState} />
    </Box>
  );
}

export default ProfileDetails;
