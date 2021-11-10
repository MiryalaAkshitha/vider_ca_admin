import { getCategories } from "api/categories";
import { getLabels } from "api/labels";
import { getTask } from "api/tasks";
import { getUsers } from "api/users";
import { useQuery, UseQueryResult } from "react-query";
import { useParams } from "react-router";
import {
  DataResponseType,
  LabelsDataResponse,
  UsersDataResponse,
} from "types/createTask.types";

function useTaskViewData() {
  const params: any = useParams();

  const {
    data: task,
    isLoading: taskLoading,
  }: UseQueryResult<{ data: any }, Error> = useQuery(
    ["task", params.taskId],
    getTask,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: categories, isLoading: categoriesLoading }: DataResponseType =
    useQuery("categories", getCategories, {
      refetchOnWindowFocus: false,
    });

  const { data: labels, isLoading: labelsLoading }: LabelsDataResponse =
    useQuery("labels", getLabels, {
      refetchOnWindowFocus: false,
    });

  const { data: users, isLoading: userLoading }: UsersDataResponse = useQuery(
    "users",
    getUsers,
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    users,
    labels,
    categories,
    task,
    loading: taskLoading || categoriesLoading || labelsLoading || userLoading,
  };
}

export default useTaskViewData;
