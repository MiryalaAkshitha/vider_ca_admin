import { getCategories } from "api/services/categories";
import { getClients } from "api/services/client";
import { getLabels } from "api/services/labels";
import { getUsers } from "api/services/users";
import { useQuery } from "react-query";
import { DataResType } from "types/createTask.types";

function useCreateTaskInitialData({ enabled }: { enabled: boolean }) {
  const { data: categories, isLoading: categoriesLoading }: DataResType =
    useQuery("categories", getCategories, { enabled });

  const { data: clients, isLoading: clientsLoading }: DataResType = useQuery(
    ["clients", {}],
    getClients,
    { enabled }
  );

  const { data: labels, isLoading: labelsLoading }: DataResType = useQuery(
    "labels",
    getLabels,
    { enabled }
  );

  const { data: users, isLoading: userLoading }: DataResType = useQuery(
    "users",
    getUsers,
    { enabled }
  );

  return {
    users,
    labels,
    clients,
    categories,
    loading:
      categoriesLoading || clientsLoading || labelsLoading || userLoading,
  };
}

export default useCreateTaskInitialData;
