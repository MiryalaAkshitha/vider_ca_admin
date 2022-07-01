import { getCategories } from "api/services/categories";
import { getLabels } from "api/services/labels";
import { getUsers } from "api/services/users";
import { useQuery } from "react-query";
import { ResType } from "types";

function useTaskViewData() {
  const { data: categories, isLoading: categoriesLoading }: ResType = useQuery(
    "categories",
    getCategories
  );

  const { data: labels, isLoading: labelsLoading }: ResType = useQuery(
    "labels",
    getLabels
  );

  const { data: users, isLoading: userLoading }: ResType = useQuery(
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
