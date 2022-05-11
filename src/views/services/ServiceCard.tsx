import { ArrowRightAltOutlined } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomCard from "components/CustomCard";

function ServiceCard() {
  return (
    <CustomCard>
      <Typography color='primary' variant='subtitle2' mb={1}>
        Business registration
      </Typography>
      <Typography color='gray' variant='body2'>
        Curabitur vulputate arcu odio, ac facilisis diam acc umsan ut. Ut
        imperdiet et leo in vulputate. Sed eleifend lacus eu sapien sagittis
        imperdiet. Curabitur vulputate arcu odio, ac facilisis diam acc umsan
        ut.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box display='flex' justifyContent='space-between'>
        <Typography color='skyblue' variant='subtitle2'>
          INR 699
        </Typography>
        <Button endIcon={<ArrowRightAltOutlined />}>View details</Button>
      </Box>
    </CustomCard>
  );
}

export default ServiceCard;
