import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import {
  keepBothFilesOrFolders,
  replaceFileOrFolder,
} from "api/services/storage";
import DialogWrapper from "components/DialogWrapper";
import { snack } from "components/toast";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

interface IProps extends DialogProps {
  originId: number;
  destinationId: number;
}

function SameFileOrFolderWarning(props: IProps) {
  const { open, setOpen, originId, destinationId } = props;
  const queryClient = useQueryClient();

  const { mutate } = useMutation(replaceFileOrFolder, {
    onSuccess: () => {
      snack.success("Success");
      setOpen(false);
      queryClient.invalidateQueries("storage");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: keepBoth } = useMutation(keepBothFilesOrFolders, {
    onSuccess: () => {
      snack.success("Success");
      setOpen(false);
      queryClient.invalidateQueries("storage");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleKeepBoth = () => {
    keepBoth({
      originId,
      destinationId,
    });
  };

  const handleReplace = () => {
    mutate({
      originId,
      destinationId,
    });
  };

  return (
    <DialogWrapper open={open} setOpen={setOpen} title="Warning">
      <Typography variant="body1">
        The destination folder already contains a file or folder with the same
        name.
      </Typography>
      <Box display="flex" mt={3} justifyContent="flex-end" gap={1}>
        <Button onClick={handleReplace} color="secondary" variant="outlined">
          Replace
        </Button>
        <Button onClick={handleKeepBoth} color="secondary" variant="outlined">
          Keep Both
        </Button>
      </Box>
    </DialogWrapper>
  );
}

export default SameFileOrFolderWarning;
