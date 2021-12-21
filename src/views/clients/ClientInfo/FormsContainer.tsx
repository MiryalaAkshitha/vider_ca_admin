import { Button, Divider, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { addToClientInfo } from "api/services/client-info";
import { getForms } from "api/services/forms";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import { Fragment } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";

type Props = {
  onUpdate: () => void;
};

function FormsContainer({ onUpdate }: Props) {
  const params = useParams();
  const snack = useSnack();
  const queryClient = useQueryClient();

  const { data, isLoading }: ResType = useQuery(
    ["forms", { tags: "kyb" }],
    getForms
  );

  const { mutate, isLoading: updateKybLoading } = useMutation(addToClientInfo, {
    onSuccess: () => {
      snack.success("Form Added");
      queryClient.invalidateQueries("client-info");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const addForm = (item: any) => {
    mutate({
      formId: item?.id,
      clientId: params.clientId || "",
      type: "kyb",
    });
  };

  if (updateKybLoading) return <Loader />;

  return (
    <Box>
      <Box textAlign="right" mb={2}>
        <Button onClick={onUpdate} variant="outlined" color="secondary">
          Save Details
        </Button>
      </Box>
      <Typography color="primary" variant="subtitle2">
        Add Fields
      </Typography>
      <Box mt={2} bgcolor="rgba(24, 47, 83, 0.06)">
        {isLoading ? (
          <Loader />
        ) : (
          <List sx={{ p: 2 }}>
            {data?.data.map((item: any, index: number) => (
              <Fragment key={index}>
                <ListItem
                  onClick={() => addForm(item)}
                  sx={{ py: "12px" }}
                  button
                >
                  <Typography color="primary" variant="body1">
                    + {item?.name}
                  </Typography>
                </ListItem>
                {index !== data?.data?.length - 1 && <Divider />}
              </Fragment>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default FormsContainer;
