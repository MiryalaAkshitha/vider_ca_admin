import { Box } from "@mui/system";
import { Grid, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface Props {
  active: boolean;
  img: any;
  title: string;
  desc: string;
  btnTitle: string;
  btnAction: () => void;
}

const GetStartedCard = (props: Props) => {
  const { active, img, title, desc, btnAction, btnTitle } = props;
  return (
    <>
      <Box
        mt={2}
        p={1}
        sx={{ border: "1px solid #22222229", maxWidth: "850px" }}
      >
        <Grid container>
          <Grid item xs={1}>
            {active ? (
              <CheckCircleOutlineIcon
                sx={{ fontSize: "50px", color: "green" }}
              />
            ) : (
              <CheckCircleOutlineIcon
                sx={{ fontSize: "50px", color: "#DDDDDD" }}
              />
            )}
          </Grid>
          <Grid item xs={1}>
            <Box p={1}>
              <img src={img} alt="" width="30px" />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="subtitle2">{title}</Typography>
            <Typography variant="body2">{desc}</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={btnAction} variant="outlined" color="error">
              {btnTitle}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default GetStartedCard;
