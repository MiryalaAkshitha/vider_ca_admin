import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTitle } from "redux/reducers/globalSlice";

function useTitle(title: string) {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTitle(title));
  }, [dispatch, title]);

  return "Title Updated";
}

export default useTitle;
