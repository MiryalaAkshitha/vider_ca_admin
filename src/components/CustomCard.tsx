import { Box } from "@mui/system";

function CustomCard({ children }: any) {
  return (
    <Box sx={{ boxShadow: "0px 5px 20px #0000001A", p: 2, borderRadius: 5 }}>
      {children}
    </Box>
  );
}

export default CustomCard;
