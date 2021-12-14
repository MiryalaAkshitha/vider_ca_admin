import { getCategories } from "api/services/categories";
import { getLabels } from "api/services/labels";
import { getUsers } from "api/services/users";
import { useQuery } from "react-query";
import { ResponseType } from "types";

function useTaskViewData() {
  const { data: categories, isLoading: categoriesLoading }: ResponseType =
    useQuery("categories", getCategories);

  const { data: labels, isLoading: labelsLoading }: ResponseType = useQuery(
    "labels",
    getLabels
  );

  const { data: users, isLoading: userLoading }: ResponseType = useQuery(
    "users",
    getUsers
  );

  return {
    users,
    labels,
    categories,
    loading: categoriesLoading || labelsLoading || userLoading,
  };
}

export default useTaskViewData;
