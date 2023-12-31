import { getCategories } from "api/services/categories";
import { getClients } from "api/services/clients/clients";
import { getLabels } from "api/services/labels";
import { getUsers } from "api/services/users";
import { useQuery } from "react-query";
import { ResType } from "types";

function useCreateTaskInitialData({ enabled = true }: { enabled?: boolean }) {
  const { data: categories, isLoading: categoriesLoading }: ResType = useQuery(
    "categories",
    getCategories,
    { enabled }
  );

  const { data: clients, isLoading: clientsLoading }: ResType = useQuery(
    ["clients", {}],
    getClients,
    { enabled }
  );

  const { data: labels, isLoading: labelsLoading }: ResType = useQuery(
    "labels",
    getLabels,
    { enabled }
  );

  const { data: users, isLoading: userLoading }: ResType = useQuery(
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
