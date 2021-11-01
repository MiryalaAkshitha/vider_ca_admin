import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ProfileImage from "./ProfileImage";

function Profile({ data, setState, onUpdate }: any) {
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
                onChange={(v) => setState({ ...data, image: v })}
              />
              <Box flex={1}>
                <Typography variant="subtitle2" gutterBottom>
                  {data?.displayName}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {data?.category}
                </Typography>
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
                {data?.email}
              </Typography>
            </div>
            <div>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body2" color="primary">
                {data?.mobileNumber}
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
