import { usePermissions } from "context/PermissionsProvider";
import { Permissions } from "utils/permissons";

interface Props {
  name: Permissions | Array<string>;
  children: React.ReactNode | null;
}

function ValidateAccess({ name, children }: Props) {
  let { permissions, role } = usePermissions();

  if (role?.defaultRole) {
    return <>{children}</>;
  }

  if (Array.isArray(name)) {
    let isPermitted = name.some((item) => permissions.includes(item));
    return isPermitted ? <>{children}</> : null;
  }

  if (permissions.includes(name)) {
    return <>{children}</>;
  }

  return null;
}

export default ValidateAccess;
