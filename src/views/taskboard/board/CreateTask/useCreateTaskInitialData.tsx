import { getCategories } from "api/services/categories";
import { getClients } from "api/services/client";
import { getLabels } from "api/services/labels";
import { getUsers } from "api/services/users";
import { useQuery } from "react-query";
import { DataResponseType } from "types/createTask.types";

function useCreateTaskInitialData({ enabled }: { enabled: boolean }) {
  const { data: categories, isLoading: categoriesLoading }: DataResponseType =
    useQuery("categories", getCategories, {
      refetchOnWindowFocus: false,
      enabled,
    });

  const { data: clients, isLoading: clientsLoading }: DataResponseType =
    useQuery(["clients", {}], getClients, {
      refetchOnWindowFocus: false,
      enabled,
    });

  const { data: labels, isLoading: labelsLoading }: DataResponseType = useQuery(
    "labels",
    getLabels,
    {
      refetchOnWindowFocus: false,
      enabled,
    }
  );

  const { data: users, isLoading: userLoading }: DataResponseType = useQuery(
    "users",
    getUsers,
    {
      refetchOnWindowFocus: false,
      enabled,
    }
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
