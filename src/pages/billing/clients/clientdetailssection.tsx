import ExpandLess from "@mui/icons-material/ExpandLess";
import { Box, IconButton, Typography, Grid, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { StyledTaskBox } from "views/dashboard/OrgDashboard/styles";
import { getUsers } from "api/services/users";

import profileimage from "./assets/profileimage.jpg";
import ProfileImage from "views/client-view/ProfileDetails/ProfileImage";
import { useClientData } from "context/ClientData";
import { getClient } from "api/services/clients/clients";
import { useQuery } from "react-query";
import { ResType } from "types";
function ClientDetailsSection() {
  const params = useParams();

  const navigate = useNavigate();
  const { data: client, isLoading, error }: ResType = useQuery(
    ['client-details', params.clientId],
    getClient
  );
  console.log(client, "client")
  return (
    <>
      {client && client?.data &&
        <StyledTaskBox sx={{ width: "410px", height: "800px" }}>
          <header>
            <Typography variant="h6">Peronal details</Typography>
          </header>
          <main>
            <Button
              sx={{
                width: "370px",
                height: "70px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <img src="profileimage.jpg" width="60" height="70" />{" "} */}
              {/* <ProfileImage style={{height:"50px",width:"50px"}}/> */}
              <Typography variant="h6" sx={{ fontcolor: "#1434A4" }}>
                <span style={{ color: "#1434A4", fontSize: "bold" }}>{client?.data?.displayName} </span>
                <br />
                {client?.data?.category}
              </Typography>
            </Button>
            {""}
            <Button
              sx={{
                width: "370px",
                height: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography> Client ID :</Typography>
              <br />
              <Typography>
                <span style={{ color: "primary", fontWeight: "500" }}> {client?.data?.clientId} </span>
              </Typography>
            </Button>

            <Button
              sx={{
                width: "370px",
                height: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography> Mobile Number: </Typography>
              <br />
              <Typography>
                {" "}
                <span style={{ color: "primary", fontWeight: "500" }}> {client?.data?.mobileNumber}</span>{" "}
              </Typography>
            </Button>

            <Button
              sx={{
                width: "370px",
                height: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography> e-mail :</Typography>
              <br />
              <Typography>
                {" "}
                <span style={{ color: "primary", fontWeight: "500" }}> {client?.data?.email}</span>
              </Typography>
            </Button>
          </main>
          <header>
            <Typography variant="h6">Statutory details</Typography>
          </header>
          <main>
            <Button
              sx={{
                width: "370px",
                height: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography> GSTIN :</Typography>
              <br />
              <Typography>
                {" "}
                <span style={{ color: "primary", fontWeight: "500" }}> {client?.data?.gstNumber}</span>
              </Typography>
            </Button>

            <Button
              sx={{
                width: "370px",
                height: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <Typography> PAN Number:</Typography>
              <br />
              <Typography>
                {" "}
                <span style={{ color: "primary", fontWeight: "500" }}>{client?.data?.panNumber} </span>{" "}
              </Typography>
            </Button>

            <Button
              sx={{
                width: "370px",
                height: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <Typography> Address: </Typography>
              <br />
              <Typography>
                {" "}
                <span style={{ color: "primary", fontWeight: "500" }}>
                  {" "}
                  {client?.data?.buildingName} ,{client?.data?.street},<br></br>{client?.data?.city},<br></br>{client?.data?.state},{client?.data?.pincode}


                </span>
              </Typography>
            </Button>
          </main>
          <header>
            <Typography variant="h6">Client Users</Typography>
          </header>
          <main style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>

            <Grid>
              <Button
                variant="outlined"
                sx={{
                  width: "370px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>
                  {client?.data?.contactPersons && client?.data?.contactPersons?.length && client?.data?.contactPersons[0]?.name} <br />
                  <span style={{ color: "primary", fontWeight: "500" }}>
                    {client?.data?.contactPersons && client?.data?.contactPersons?.length && client?.data?.contactPersons[0].role}
                  </span>
                </Typography>
                <Typography>
                  {" "}
                  {client?.data?.contactPersons && client?.data?.contactPersons?.length && client?.data?.contactPersons[0].mobile} <br />
                  <span style={{ color: "primary", fontWeight: "500" }}> {client?.data?.contactPersons && client?.data?.contactPersons?.length && client?.data.contactPersons[0].email}</span>
                </Typography>
              </Button>
              {/* <Button
              variant="outlined"
              sx={{
                width: "370px",
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>
                {client?.data?.contactPersons[1]?.name} <br />
                <span style={{ color: "primary", fontWeight:"500" }}> {client?.data?.contactPersons[1].role}</span>
              </Typography>
              <Typography>
                {" "}
                {client?.data?.contactPersons[1].mobile} <br />
                <span style={{ color: "primary", fontWeight:"500" }}> {client?.data.contactPersons[1].email}</span>
              </Typography>
            </Button> */}
            </Grid>
          </main>
        </StyledTaskBox>
      }
    </>
  );
}

export default ClientDetailsSection;

