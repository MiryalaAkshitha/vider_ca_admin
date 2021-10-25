import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

function FullLoader() {
  return (
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
  );
}

export default FullLoader;
