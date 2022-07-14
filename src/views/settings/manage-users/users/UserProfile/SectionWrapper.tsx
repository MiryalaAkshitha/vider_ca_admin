import { Box, Typography } from "@mui/material";

interface IProps {
  title: string;
  children: any;
}

const SectionWrapper = (props: IProps) => {
  const { title, children } = props;
  return (
    <Box mb={4} px={3} maxWidth={1400}>
      <Typography variant="subtitle2" color="primary">
        {title}
      </Typography>
      <Box mt={2}>{children}</Box>
    </Box>
  );
};

export default SectionWrapper;
