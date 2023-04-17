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
            <Typography variant="h6">Personal details</Typography>
          </header>

          <Button
            sx={{
              width: "370px",
              height: "70px",
              display: "flex",
              justifyContent: "center",
            }}
          >
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
              marginLeft: "20px"
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
              marginLeft: "20px"

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
              marginBottom: "20px",
              marginLeft: "20px"

            }}
          >
            <Typography> e-mail :</Typography>
            <br />
            <Typography>
              {" "}
              <span style={{ color: "primary", fontWeight: "500" }}> {client?.data?.email}</span>
            </Typography>
          </Button>
          <Button
            sx={{
              width: "370px",
              height: "70px",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              marginLeft: "20px"

            }}
          >

            <Typography variant="h6" sx={{ fontcolor: "#1434A4" }}>
              <span style={{ color: "#1434A4", fontSize: "bold" }}>Address </span>
              <br />
              {client?.data?.buildingName &&
                client.data.buildingName + ", "}
              {client?.data?.street && client.data.street + ", "}
              {client?.data?.city && client.data.city + ", "}
              <br />
              {client?.data?.state && client.data.state + ", "}
              {client?.data?.pincode && client.data.pincode}
            </Typography>
          </Button>

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
              <Typography> PAN :</Typography>
              <br />
              <Typography>
                {" "}
                <span style={{ color: "primary", fontWeight: "500" }}>{client?.data?.panNumber} </span>{" "}
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
                {client?.data?.contactPersons && client?.data?.contactPersons?.length > 0 && <>

                  {client?.data?.contactPersons?.map((item: any, index: number) => (
                    <>
                      <Typography mt={1} key={index} variant="body2">

                        {item?.name} <br />
                        <span style={{ color: "primary", fontWeight: "500" }}>
                          {item.role}
                        </span>
                      </Typography>
                      <Typography>
                        {" "}
                        {item.mobile} <br />
                        <span style={{ color: "primary", fontWeight: "500" }}>
                          {item.email}</span>
                      </Typography>
                    </>
                  ))}
                </>
                }
                {client?.data?.contactPersons && client?.data?.contactPersons?.length == 0 && <>
                  <Typography>
                    {" "}
                    {"NA"} <br />
                  </Typography>
                </>}
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

