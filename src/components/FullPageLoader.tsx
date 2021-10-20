import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/reducers/globalSlice";
import store, { RootState } from "redux/store";

export function loading(v: boolean) {
  store.dispatch(setLoading(v));
}

function FullPageLoader({ children }: any) {
  const { loading } = useSelector((state: RootState) => state.global);

  return (
    <>
      {children}
      {loading && (
        <Box
          minHeight='100vh'
          bgcolor='rgba(0,0,0,0.8)'
          position='fixed'
          top={0}
          left={0}
          zIndex={2000}
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='100%'
          height='100%'>
          <CircularProgress size='50px' color='secondary' />
        </Box>
      )}
    </>
  );
}

export default FullPageLoader;
