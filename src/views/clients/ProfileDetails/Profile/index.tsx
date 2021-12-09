import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { StyledLabel } from "views/labels/styles";
import ProfileImage from "./ProfileImage";

interface IProfileProps {
  data: any;
  onUpdate: () => void;
  setState: (state: any) => void;
}

function Profile({ data, setState, onUpdate }: IProfileProps) {
  return (
    <Box>
      <Grid
        container
        alignItems="center"
        sx={{
          p: 3,
          background: "#FBF9F2",
        }}
      >
        <Grid item xs={10}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Box maxWidth={400} display="flex" gap={2} alignItems="center">
              <ProfileImage
                src={data?.imageUrl}
                onChange={(v: string) => setState({ ...data, image: v })}
              />
              <Box flex={1}>
                <Typography variant="subtitle2">{data?.displayName}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {data?.category}
                </Typography>
                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                  {data?.labels?.map((item, index) => (
                    <StyledLabel key={index} color={"rgba(20, 158, 205,0.1)"}>
                      <Typography color="black" variant="caption">
                        {item?.name}
                      </Typography>
                    </StyledLabel>
                  ))}
                </Box>
              </Box>
            </Box>
            <div>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Client ID
              </Typography>
              <Typography variant="body2" color="primary">
                {data?.clientId}
              </Typography>
            </div>
            {data?.panNumber && (
              <div>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  gutterBottom
                >
                  Pan Number
                </Typography>
                <Typography variant="body2" color="primary">
                  {data?.panNumber}
                </Typography>
              </div>
            )}
            <div>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="body2" color="primary">
                <a
                  style={{ color: "inherit", textDecoration: "none" }}
                  href={`mailto:${data?.email}`}
                >
                  {data?.email}
                </a>
              </Typography>
            </div>
            <div>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body2" color="primary">
                <a
                  style={{ color: "inherit", textDecoration: "none" }}
                  href={`tel:${data?.mobileNumber}`}
                >
                  {data?.mobileNumber}
                </a>
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box textAlign="right">
            <Button onClick={onUpdate} variant="outlined" color="secondary">
              Update Profile
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
