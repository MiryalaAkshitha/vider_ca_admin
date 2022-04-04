import { Grid,
  Typography,
  List,
  ListItemButton
   } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';
import ListItemText from "@mui/material/ListItemText";
import RouterLink from "components/RouterLink";
import formMenu from './form-menu';
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
    typographyStyle : {
      color: "#0D46A0",
    }
  })
)

const FormNav = () => {
  const theme = useTheme();
  const location = useLocation();

  const classes = useStyles();

  return (
    <Grid item>
      <List style={{maxWidth: '180px', width: '100%'}}>
        {
          formMenu.map((item: any) => (
            <RouterLink
              to={item.path}
              >
              <ListItemButton
                selected={true}
                sx={{
                  opacity: item.pathName === location.pathname ? 1 : 0.4,
                  "&.Mui-selected:hover": {
                    background: "rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" className={classes.typographyStyle}>
                      {item?.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            </RouterLink>
          ))
        }
      </List>
    </Grid>
  )
}

export default FormNav