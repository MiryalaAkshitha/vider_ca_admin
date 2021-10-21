import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import BreadCrumbs from "components/BreadCrumbs";
import useTitle from "hooks/useTitle";

const clientMenu = [
  {
    title: "Profile",
    page: "/profile",
  },
];

function ClientProfile() {
  useTitle("Clients");

  return (
    <div>
      <BreadCrumbs page='clientProfile' />
      <Box
        sx={{
          background: "#F5F5F5",
          display: "flex",
          justifyContent: "center",
          gap: 5,
          py: 2,
        }}>
        <Typography sx={{ color: "rgba(0,0,0,0.6)", cursor: "pointer" }}>
          Profile
        </Typography>
        <Typography sx={{ color: "rgba(0,0,0,0.6)", cursor: "pointer" }}>
          Passwords
        </Typography>
        <Typography sx={{ color: "rgba(0,0,0,0.6)", cursor: "pointer" }}>
          KYB Info
        </Typography>
        <Typography sx={{ color: "rgba(0,0,0,0.6)", cursor: "pointer" }}>
          Attachments
        </Typography>
      </Box>
    </div>
  );
}

export default ClientProfile;
