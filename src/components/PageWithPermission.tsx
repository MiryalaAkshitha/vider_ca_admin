import BlockIcon from "@mui/icons-material/Block";
import { Box, Typography } from "@mui/material";
import { usePermissions } from "context/PermissionsProvider";
import { Permissions } from "utils/permissons";

interface Props {
  name: Permissions;
  children: React.ReactNode | null;
}

function PageWithPermission({ name, children }: Props) {
  let { permissions } = usePermissions();

  if (permissions.includes(name)) {
    return <>{children}</>;
  }

  return (
    <Box
      minHeight="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        p={2}
        borderRadius={2}
        minWidth={300}
        textAlign="center"
        bgcolor="rgb(253, 237, 237)"
      >
        <BlockIcon
          fontSize="large"
          sx={{
            color: "rgb(95, 33, 32)",
          }}
        />
        <Typography variant="subtitle2" color="rgb(95, 33, 32)">
          Permission denied
        </Typography>
      </Box>
    </Box>
  );
}

export default PageWithPermission;
