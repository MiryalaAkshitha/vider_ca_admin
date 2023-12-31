import { getGetStarted } from "api/services/organization";
import Loader from "components/Loader";
import { usePermissions } from "context/PermissionsProvider";
import useTitle from "hooks/useTitle";
import { useQuery } from "react-query";
import { ResType } from "types";
import GetStarted from "views/dashboard/GetStarted";
import Dashboard from "views/dashboard/OrgDashboard";

function Home() {
  useTitle("Dashboard");
  const { role } = usePermissions();

  const { data: getStarted, isLoading: getStartedLoading }: ResType = useQuery(
    "get-started",
    getGetStarted,
    {
      enabled: role?.defaultRole,
    }
  );

  if (getStartedLoading) return <Loader />;

  return role?.defaultRole && getStarted?.data?.status === "PENDING" ? (
    <GetStarted data={getStarted?.data} />
  ) : (
    <Dashboard />
  );
}

export default Home;
