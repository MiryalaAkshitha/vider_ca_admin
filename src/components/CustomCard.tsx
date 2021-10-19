import { Box, SystemStyleObject } from "@mui/system";

interface CustomCardProps {
  children: any;
  sx?: SystemStyleObject;
}

function CustomCard(props: CustomCardProps) {
  const { children, sx } = props;
  return (
    <Box
      sx={{
        boxShadow: "0px 5px 20px #0000001A",
        p: 2,
        borderRadius: 2,
        ...sx,
      }}>
      {children}
    </Box>
  );
}

export default CustomCard;
