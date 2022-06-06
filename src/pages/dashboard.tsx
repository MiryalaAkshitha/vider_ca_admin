import {
  getGetStarted,
  getOrganizationDashboard,
} from "api/services/organization";
import Loader from "components/Loader";
import moment from "moment";
import { useQuery } from "react-query";
import { ResType } from "types";
import GetStarted from "views/dashboard/GetStarted";
import Dashboard from "views/dashboard/OrgDashboard";

function Home() {
  const { data: getStarted, isLoading: getStartedLoading }: ResType = useQuery(
    "get-started",
    getGetStarted
  );

  let status = getStarted?.data?.status;

  const { data, isLoading }: ResType = useQuery(
    "org-dashboard",
    getOrganizationDashboard,
    {
      enabled: Boolean(status) && status !== "PENDING",
    }
  );

  if (getStartedLoading || isLoading) return <Loader />;

  return getStarted?.data?.status === "PENDING" ? (
    <GetStarted data={getStarted?.data} />
  ) : (
    <Dashboard data={data?.data} />
  );
}

export default Home;
