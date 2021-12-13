import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  children: React.ReactNode;
  label: string;
  labelWidth?: string;
}

const DetailSection = ({ children, label, labelWidth = "30%" }: Props) => (
  <Box sx={{ borderBottom: "1px dashed rgba(0,0,0,0.1)" }}>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box width={labelWidth}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1">{label}</Typography>
          <Typography variant="h6">:</Typography>
        </Box>
      </Box>
      <Box flex={1} pl={2}>
        {children}
      </Box>
    </Box>
  </Box>
);

export default DetailSection;
