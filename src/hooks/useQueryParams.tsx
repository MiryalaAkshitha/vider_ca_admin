import { useSearchParams } from "react-router-dom";

function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  return { queryParams, setQueryParams: setSearchParams };
}

export default useQueryParams;
