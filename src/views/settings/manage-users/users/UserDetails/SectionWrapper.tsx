import { Box, Typography } from "@mui/material";

interface IProps {
  title: string;
  children: any;
}

const SectionWrapper = (props: IProps) => {
  const { title, children } = props;
  return (
    <Box
      mb={3}
      sx={{
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          background: "rgb(24, 47, 83, 0.05)",
          px: 2,
          py: 1,
          mb: 1,
        }}
      >
        <Typography variant="subtitle2" color="primary">
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export default SectionWrapper;
