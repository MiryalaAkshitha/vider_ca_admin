import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createPermissions } from "api/services/roles";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

function CreatePermissions({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();

  const [label, setLabel] = useState("");
  const [permissions, setPermissions] = useState<Array<string>>([]);
  const [value, setValue] = useState("");

  const { mutate, isLoading } = useMutation(createPermissions, {
    onSuccess: () => {
      snack.success("Permissions Created");
      queryClient.invalidateQueries("permissions");
    },
    onError: (err: any) => {
      snack.error("Error creating permissions");
    },
  });

  const handleOptionDelete = (i: number) => {
    const options = [...permissions];
    options.splice(i, 1);
    setPermissions(options);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!permissions.length) {
      snack.error("Please add at least one permission");
      return;
    }
    mutate({
      label,
      permissions,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Create Permissions">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setLabel(e.target.value)}
          required
          label="Label"
          name="label"
        />
        {permissions.map((item, index) => (
          <Box display="flex" gap={1} alignItems="center">
            <Box flex={1}>
              <Typography variant="body1">
                {index + 1}. {item}
              </Typography>
            </Box>
            <div>
              <IconButton onClick={() => handleOptionDelete(index)}>
                <Delete />
              </IconButton>
            </div>
          </Box>
        ))}
        <Box mt={2}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Permission Name"
          />
          <Box mt={1}>
            <Button
              sx={{ minWidth: 50 }}
              color="secondary"
              variant="outlined"
              size="small"
              onClick={() => {
                setPermissions([...permissions, value]);
                setValue("");
              }}
              startIcon={<Add />}
            >
              Add
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            type="submit"
            loadingColor="white"
            title="Create Permissions"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default CreatePermissions;
