import {
  Grid,
  Menu,
  IconButton,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { emptyLicenses } from "assets";

const BankAccountDetailsCard = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
  }));
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <Grid item xs={6}>
          <Box
            sx={{
              backgroundColor: "#F7F7F7",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Grid container>
              <Grid item xs={7}>
                <Box>
                  <Box>
                    <Typography
                      component="p"
                      style={{
                        display: "inline-block",
                        width: "45%",
                        fontSize: "12px",
                        marginTop: "10px",
                      }}
                    >
                      Bank Name
                    </Typography>
                    <Typography component="span">:</Typography>
                    <Typography
                      component="span"
                      sx={{
                        marginLeft: "15px",
                        width: "50%",
                        fontSize: "12px",
                        fontWeight: 600,
                        marginTop: "10px",
                      }}
                    >
                      HDFC Bank
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="p"
                      style={{
                        display: "inline-block",
                        width: "45%",
                        fontSize: "12px",
                        marginTop: "10px",
                      }}
                    >
                      Bank Branch
                    </Typography>
                    <Typography component="span">:</Typography>
                    <Typography
                      component="span"
                      sx={{
                        marginLeft: "15px",
                        width: "50%",
                        fontSize: "12px",
                        fontWeight: 600,
                        marginTop: "10px",
                      }}
                    >
                      Manikonda
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="p"
                      style={{
                        display: "inline-block",
                        width: "45%",
                        fontSize: "12px",
                        marginTop: "10px",
                      }}
                    >
                      Bank Account Number
                    </Typography>
                    <Typography component="span">:</Typography>
                    <Typography
                      component="span"
                      sx={{
                        marginLeft: "15px",
                        width: "50%",
                        fontSize: "12px",
                        fontWeight: 600,
                        marginTop: "10px",
                      }}
                    >
                      8834 8570 8382 5432
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="p"
                      style={{
                        display: "inline-block",
                        width: "45%",
                        fontSize: "12px",
                        marginTop: "10px",
                      }}
                    >
                      IFSC Code
                    </Typography>
                    <Typography component="span">:</Typography>
                    <Typography
                      component="span"
                      sx={{
                        marginLeft: "15px",
                        width: "50%",
                        fontSize: "12px",
                        fontWeight: 600,
                        marginTop: "10px",
                      }}
                    >
                      HDFC0034545
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="p"
                      style={{
                        display: "inline-block",
                        width: "45%",
                        fontSize: "12px",
                        marginTop: "10px",
                      }}
                    >
                      UPI ID
                    </Typography>
                    <Typography component="span">:</Typography>
                    <Typography
                      component="span"
                      sx={{
                        marginLeft: "15px",
                        width: "50%",
                        fontSize: "12px",
                        fontWeight: 600,
                        marginTop: "10px",
                      }}
                    >
                      Venkat@okhdfc
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img src={emptyLicenses} alt="" />
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box sx={{ marginLeft: "10px" }}>
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                  onClick={() => setAnchorEl(null)}
                  open={Boolean(anchorEl)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default BankAccountDetailsCard;
