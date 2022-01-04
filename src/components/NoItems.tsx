import { Box, Button, Typography } from "@mui/material";

type Props = {
  title?: string;
  desc?: string;
  img?: string;
  btnTitle?: string;
  btnAction?: () => void;
};

function NoItems({ title, desc, img, btnTitle, btnAction }: Props) {
  return (
    <Box
      px={2}
      py={10}
      justifyContent="center"
      maxWidth={550}
      mx="auto"
      display="flex"
      gap={4}
      alignItems="center"
    >
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <Typography variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2">{desc}</Typography>
        {btnTitle && (
          <Button
            onClick={btnAction}
            sx={{ mt: 3 }}
            variant="outlined"
            color="secondary"
          >
            {btnTitle}
          </Button>
        )}
      </div>
    </Box>
  );
}

export default NoItems;
