import { getCategories } from "api/categories";
import { getClients } from "api/client";
import { getLabels } from "api/labels";
import { getUsers } from "api/users";
import { useQuery } from "react-query";
import {
  ClientsDataResponse,
  DataResponseType,
  LabelsDataResponse,
  UsersDataResponse,
} from "types/createTask.types";

function useCreateTaskInitialData({ enabled }: { enabled: boolean }) {
  const { data: categories, isLoading: categoriesLoading }: DataResponseType =
    useQuery("categories", getCategories, {
      refetchOnWindowFocus: false,
      enabled,
    });

  const { data: clients, isLoading: clientsLoading }: ClientsDataResponse =
    useQuery(["clients", {}], getClients, {
      refetchOnWindowFocus: false,
      enabled,
    });

  const { data: labels, isLoading: labelsLoading }: LabelsDataResponse =
    useQuery("labels", getLabels, {
      refetchOnWindowFocus: false,
      enabled,
    });

  const { data: users, isLoading: userLoading }: UsersDataResponse = useQuery(
    "users",
    getUsers,
    {
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
