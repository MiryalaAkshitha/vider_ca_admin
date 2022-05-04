import { Box, Typography } from "@mui/material";

interface Props {
  label: string;
  description?: string;
}

function FormBuilderSection(props: Props) {
  const { label, description = "" } = props;

  return (
    <Box
      sx={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        pb: 1,
        mb: -2,
      }}
    >
      <Typography variant="subtitle1">{label}</Typography>
      {description && (
        <Typography variant="caption" color="rgba(0,0,0,0.6)">
          {description}
        </Typography>
      )}
    </Box>
  );
}

export default FormBuilderSection;
