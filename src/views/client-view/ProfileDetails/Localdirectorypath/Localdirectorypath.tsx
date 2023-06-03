import { MoreVert } from "@mui/icons-material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteContactPerson, updateClient } from "api/services/clients/clients";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { StyledContactPerson, StyledLocaldirectorypath } from "views/clients/styles";
import EditLocaldirectorypath from "./EditLocaldirectorypath";
import { handleError } from "utils/handleError";
import { useParams } from "react-router-dom";

type Props = {
  index: any;
  state: any;
  data: any;
  setState: any;
  apiData: any;
};

function Localdirectorypath({ index, state, data, setState, apiData }: Props) {
  const params = useParams();
  const confirm = useConfirm();
  const menu = useMenu();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const { mutate } = useMutation(updateClient, {
    onSuccess: () => {
      snack.success("Local Directory Path Deleted ");
      queryClient.invalidateQueries("client");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleRemove = () => {
    confirm({
      msg: "Are you sure you want to delete this path ?",
      action: () => {

        const { ...data } = state;
        data.localDirectoryPath.splice(index, 1);

        setState({
          ...data
        });

        mutate({ data, id: params.clientId });
      },
    });
  };

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    menu({
      target: event.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => setOpen(true),
        },
        {
          label: "Copy",
          action: () => {
            navigator.clipboard.writeText(data?.localDirectoryPath[index]?.path);
            snack.success(`Copied ${data?.localDirectoryPath[index]?.path} to clipboard`);
          },
        },
        {
          label: "Delete",
          action: handleRemove,
        },
      ],
    });
  };

  return (
    <StyledLocaldirectorypath>

      <Box>
        <Typography variant="body2">
          {data?.localDirectoryPath[index].title}
        </Typography>
        <Typography style={{ color: "#149ECD" }} variant="body2">
          {data?.localDirectoryPath[index]?.path}
        </Typography>
      </Box>
      <Box position="absolute" right={5} top={5}>
        <IconButton name={index} onClick={handleMenu}>
          <MoreVert />
        </IconButton>
      </Box>
      <EditLocaldirectorypath open={open} index={index} data={data} setOpen={setOpen} setState={setState} />
    </StyledLocaldirectorypath>
  );
}

export default Localdirectorypath;
