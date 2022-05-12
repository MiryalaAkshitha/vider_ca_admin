import { usePermissions } from "context/PermissionsProvider";
import { Permissions } from "utils/permissons";

interface Props {
  name: Permissions;
  children: React.ReactNode | null;
}

function ValidateAccess({ name, children }: Props) {
  let { permissions } = usePermissions();

  if (permissions.includes(name)) {
    return <>{children}</>;
  }

  return null;
}

export default ValidateAccess;
