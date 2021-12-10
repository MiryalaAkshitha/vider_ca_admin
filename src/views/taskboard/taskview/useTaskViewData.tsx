import { getCategories } from "api/services/categories";
import { getLabels } from "api/services/labels";
import { getTask } from "api/services/tasks";
import { getUsers } from "api/services/users";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { ResponseType } from "types";

function useTaskViewData() {
  const params: any = useParams();

  const { data: task, isLoading: taskLoading }: ResponseType = useQuery(
    ["task", params.taskId],
    getTask,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: categories, isLoading: categoriesLoading }: ResponseType =
    useQuery("categories", getCategories, {
      refetchOnWindowFocus: false,
    });

  const { data: labels, isLoading: labelsLoading }: ResponseType = useQuery(
    "labels",
    getLabels,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: users, isLoading: userLoading }: ResponseType = useQuery(
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
